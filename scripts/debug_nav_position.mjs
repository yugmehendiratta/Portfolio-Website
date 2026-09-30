import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9270;
const TARGET_URL = 'http://localhost:3000/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function debugNav() {
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-nav-')
  ]);

  try {
    let wsUrl;
    for (let i = 0; i < 30; i++) {
      try {
        const res = await fetch(`http://localhost:${PORT}/json/version`);
        const json = await res.json();
        if (json.webSocketDebuggerUrl) { wsUrl = json.webSocketDebuggerUrl; break; }
      } catch (e) { await delay(200); }
    }

    const ws = new WebSocket(wsUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    const callbacks = new Map();
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id && callbacks.has(data.id)) {
        callbacks.get(data.id)(data);
        callbacks.delete(data.id);
      }
    };

    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, (res) => res.error ? reject(res.error) : resolve(res.result));
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

    const targetSend = (method, params = {}) => new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, (res) => res.error ? reject(res.error) : resolve(res.result));
      ws.send(JSON.stringify({ id: msgId, method, params, sessionId }));
    });

    await targetSend('Page.enable');
    await targetSend('Runtime.enable');
    await targetSend('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

    await targetSend('Page.navigate', { url: TARGET_URL });
    await delay(3000);

    const navData = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        const getElInfo = (el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const s = window.getComputedStyle(el);
          return {
            tagName: el.tagName,
            className: el.className,
            rect: { top: r.top, left: r.left, width: r.width, height: r.height, bottom: r.bottom, right: r.right },
            position: s.position,
            top: s.top,
            left: s.left,
            transform: s.transform,
            zIndex: s.zIndex,
            display: s.display,
            visibility: s.visibility,
            opacity: s.opacity
          };
        };

        const navContainer = document.querySelector('.framer-1ukjnmv');
        const navList = document.querySelector('.framer-qu7yco');
        const navSticky = document.querySelector('.framer-rmz83s');
        const contain = document.querySelector('.framer-1u3qm76');
        const content = document.querySelector('.framer-1hsbhf7');
        const allContent = document.querySelector('.framer-1akwkpq');

        const navLinks = Array.from(document.querySelectorAll('.framer-rmz83s a, .framer-rmz83s [data-framer-name]')).map(el => ({
          text: el.innerText?.trim(),
          name: el.getAttribute('data-framer-name'),
          href: el.getAttribute('href'),
          info: getElInfo(el)
        }));

        // Search for any element with text "YOU" or cursor tags
        const allTextNodes = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while (node = walker.nextNode()) {
          if (node.nodeValue.includes('YOU') || node.nodeValue.includes('You') || node.nodeValue.includes('Yug') || node.nodeValue.includes('YUG')) {
            allTextNodes.push({
              text: node.nodeValue.trim(),
              parent: getElInfo(node.parentElement)
            });
          }
        }

        const cursorTags = Array.from(document.querySelectorAll('[data-framer-name="Cursor Tag"]')).map(getElInfo);

        return {
          window: { innerWidth: window.innerWidth, innerHeight: window.innerHeight, scrollY: window.scrollY },
          contain: getElInfo(contain),
          content: getElInfo(content),
          navContainer: getElInfo(navContainer),
          navList: getElInfo(navList),
          navSticky: getElInfo(navSticky),
          navLinks,
          allTextNodes,
          cursorTags
        };
      })()`,
      returnByValue: true
    });

    console.log('Nav Debug Info:\n', JSON.stringify(navData.result.value, null, 2));

    const shot = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('nav_debug_desktop_1440.png', Buffer.from(shot.data, 'base64'));

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

debugNav().catch(console.error);

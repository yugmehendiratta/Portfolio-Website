import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = Math.floor(Math.random() * 5000) + 9000;
const TARGET_URL = 'http://localhost:3000/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function testClickScroll() {
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-scroll-')
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

    // Let's test dispatching click on the <a> elements
    const testCases = ['#my-story', '#work', '#awards', '#mainbio'];
    const results = [];

    for (const hash of testCases) {
      const res = await targetSend('Runtime.evaluate', {
        expression: `(() => {
          const a = document.querySelector('a[href*="${hash}"]');
          if (!a) return { found: false, hash };
          a.click();
          return { found: true, hash, href: a.href };
        })()`,
        returnByValue: true
      });

      await delay(1500);

      const pos = await targetSend('Runtime.evaluate', {
        expression: `(() => {
          const navItems = Array.from(document.querySelectorAll('a')).filter(a => {
            return ['BIO', 'STORY', 'WORK', 'AWARDS'].includes(a.innerText.trim().toUpperCase());
          }).map(a => ({
            text: a.innerText.trim().toUpperCase(),
            bg: window.getComputedStyle(a).backgroundColor,
            isActive: window.getComputedStyle(a).backgroundColor === 'rgb(17, 18, 18)'
          }));

          return {
            scrollY: window.scrollY,
            activeNav: navItems.filter(n => n.isActive).map(n => n.text)
          };
        })()`,
        returnByValue: true
      });

      results.push({ test: res.result.value, outcome: pos.result.value });
    }

    console.log(JSON.stringify(results, null, 2));

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

testClickScroll().catch(console.error);

import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9272;
const TARGET_URL = 'http://localhost:3000/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function findYouElement() {
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-you-')
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

    const result = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        const youEl = Array.from(document.querySelectorAll('*')).find(el => el.children.length === 0 && el.innerText === 'You');
        if (!youEl) return 'Not found';

        const hierarchy = [];
        let curr = youEl;
        while (curr && curr !== document.body) {
          const r = curr.getBoundingClientRect();
          const s = window.getComputedStyle(curr);
          hierarchy.push({
            tag: curr.tagName,
            class: curr.className,
            framerName: curr.getAttribute('data-framer-name'),
            rect: { top: r.top, left: r.left, width: r.width, height: r.height },
            position: s.position,
            top: s.top,
            left: s.left,
            transform: s.transform
          });
          curr = curr.parentElement;
        }

        return {
          youElOuterHTML: youEl.parentElement ? youEl.parentElement.outerHTML : youEl.outerHTML,
          hierarchy
        };
      })()`,
      returnByValue: true
    });

    console.log('You Element Info:\n', JSON.stringify(result.result.value, null, 2));

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

findYouElement().catch(console.error);

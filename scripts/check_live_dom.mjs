import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9223;

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-test-')
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

    await targetSend('Page.navigate', { url: 'http://localhost:3000/about' });
    await delay(2500);

    const checkRes = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        const sections = ['#mainbio', '#my-story', '#work', '#awards'];
        const results = {};
        for (const s of sections) {
          const el = document.querySelector(s);
          if (!el) { results[s] = 'NOT FOUND'; continue; }
          const rect = el.getBoundingClientRect();
          const parent = el.parentElement;
          const parentRect = parent ? parent.getBoundingClientRect() : null;
          results[s] = {
            tagName: el.tagName,
            className: el.className,
            inlineStyle: el.getAttribute('style'),
            rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height, left: rect.left, right: rect.right },
            parentClass: parent?.className,
            parentRect: parentRect ? { left: parentRect.left, right: parentRect.right, width: parentRect.width } : null,
            computedStyle: {
              position: getComputedStyle(el).position,
              left: getComputedStyle(el).left,
              top: getComputedStyle(el).top,
              transform: getComputedStyle(el).transform,
              width: getComputedStyle(el).width,
              maxWidth: getComputedStyle(el).maxWidth,
              margin: getComputedStyle(el).margin,
              padding: getComputedStyle(el).padding
            },
            children: Array.from(el.children).map(c => ({
              tag: c.tagName,
              className: c.className,
              rect: c.getBoundingClientRect(),
              style: c.getAttribute('style'),
              transform: getComputedStyle(c).transform,
              left: getComputedStyle(c).left,
              position: getComputedStyle(c).position
            }))
          };
        }
        return results;
      })()`,
      returnByValue: true
    });

    console.log('DOM INSPECTION RESULTS:');
    console.log(JSON.stringify(checkRes.result.value, null, 2));

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

run().catch(console.error);

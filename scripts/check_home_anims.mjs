import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9237;

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function checkHome() {
  console.log('Inspecting animations on http://localhost:3000/ ...');
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-home-anim-')
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
    await targetSend('Page.navigate', { url: 'http://localhost:3000/' });
    await delay(3000);

    const homeAnims = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        const motionElements = document.querySelectorAll('[style*="transform"]');
        const cursorTags = Array.from(document.querySelectorAll('[data-framer-name="Cursor Tag"], [data-framer-name*="Tag"]')).map(el => ({
          name: el.getAttribute('data-framer-name'),
          styleTransform: el.style.transform,
          computedTransform: window.getComputedStyle(el).transform
        }));

        // Check if cursor tags are floating/looping
        const tag1 = document.querySelector('[data-framer-name="Cursor Tag"]');
        const transform1 = tag1 ? window.getComputedStyle(tag1).transform : null;

        return {
          motionElementsCount: motionElements.length,
          cursorTags,
          transform1
        };
      })()`,
      returnByValue: true
    });

    console.log('Home page animation metrics:', JSON.stringify(homeAnims.result.value, null, 2));

    await delay(1000);
    const homeAnimsLater = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        const tag1 = document.querySelector('[data-framer-name="Cursor Tag"]');
        return {
          transform2: tag1 ? window.getComputedStyle(tag1).transform : null
        };
      })()`,
      returnByValue: true
    });
    console.log('Home page after 1s:', homeAnimsLater.result.value);

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

checkHome().catch(console.error);

import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = Math.floor(Math.random() * 5000) + 9000;
const TARGET_URL = 'http://localhost:3000/play-ground';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function testDrag() {
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-drag-')
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

    // Pan canvas slightly
    await targetSend('Input.dispatchMouseEvent', { type: 'mousePressed', x: 200, y: 200, button: 'left' });
    await targetSend('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 400, y: 350 });
    await targetSend('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 400, y: 350, button: 'left' });
    await delay(800);

    const shotPanned = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('playground_panned_view.png', Buffer.from(shotPanned.data, 'base64'));
    console.log('Saved playground_panned_view.png');

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

testDrag().catch(console.error);

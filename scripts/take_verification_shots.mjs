import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = Math.floor(Math.random() * 5000) + 9000;
const TARGET_URL = 'http://localhost:3000/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function takeScreenshots() {
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-shots-')
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

    if (!wsUrl) throw new Error('Could not connect to Chrome on port ' + PORT);

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

    // 1. Scroll to Work
    await targetSend('Runtime.evaluate', {
      expression: `document.getElementById('work').scrollIntoView({ behavior: 'instant', block: 'center' })`
    });
    await delay(600);
    const shotWork = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('work_section_verified.png', Buffer.from(shotWork.data, 'base64'));
    console.log('Saved work_section_verified.png');

    // 2. Scroll to Awards
    await targetSend('Runtime.evaluate', {
      expression: `document.getElementById('awards').scrollIntoView({ behavior: 'instant', block: 'center' })`
    });
    await delay(600);
    const shotAwards = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('awards_section_verified.png', Buffer.from(shotAwards.data, 'base64'));
    console.log('Saved awards_section_verified.png');

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

takeScreenshots().catch(console.error);

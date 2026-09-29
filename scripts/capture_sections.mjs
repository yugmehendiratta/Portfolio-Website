import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9260;
const TARGET_URL = 'http://localhost:3000/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function captureDetailedVisuals() {
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-vis-')
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

    // Section 1: Bio
    const bioShot = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('gate_sec1_bio.png', Buffer.from(bioShot.data, 'base64'));

    // Section 2: Story
    await targetSend('Runtime.evaluate', { expression: `document.querySelector('#my-story').scrollIntoView({ behavior: 'instant' })` });
    await delay(800);
    const storyShot = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('gate_sec2_story.png', Buffer.from(storyShot.data, 'base64'));

    // Section 3: Work
    await targetSend('Runtime.evaluate', { expression: `document.querySelector('#work').scrollIntoView({ behavior: 'instant' })` });
    await delay(800);
    const workShot = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('gate_sec3_work.png', Buffer.from(workShot.data, 'base64'));

    // Section 4: Awards
    await targetSend('Runtime.evaluate', { expression: `document.querySelector('#awards').scrollIntoView({ behavior: 'instant' })` });
    await delay(800);
    const awardsShot = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('gate_sec4_awards.png', Buffer.from(awardsShot.data, 'base64'));

    console.log('All 4 section screenshots captured successfully!');
    ws.close();
  } finally {
    chromeProc.kill();
  }
}

captureDetailedVisuals().catch(console.error);

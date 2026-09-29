import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9235;
const TARGET_URL = 'https://yug-designsite.vercel.app/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function checkOtherViewports() {
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-viewports-')
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

    const vps = [
      { name: '768x1024', width: 768, height: 1024, mobile: true },
      { name: '375x812', width: 375, height: 812, mobile: true }
    ];

    for (const vp of vps) {
      await targetSend('Emulation.setDeviceMetricsOverride', { width: vp.width, height: vp.height, deviceScaleFactor: 1, mobile: vp.mobile });
      await targetSend('Page.navigate', { url: TARGET_URL });
      await delay(3000);

      const shot = await targetSend('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
      fs.writeFileSync(`live_vercel_${vp.name}_now.png`, Buffer.from(shot.data, 'base64'));
      console.log(`Saved screenshot: live_vercel_${vp.name}_now.png`);
    }

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

checkOtherViewports().catch(console.error);

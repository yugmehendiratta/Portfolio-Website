import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = Math.floor(Math.random() * 5000) + 9000;

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function takeArkcvShots() {
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
    await targetSend('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });

    // 1. ArkCV Case Study Detail - Top Hero
    await targetSend('Page.navigate', { url: 'http://localhost:3000/case-study/meridian-health' });
    await delay(3000);
    const shotDetailHero = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('arkcv_case_study_hero.png', Buffer.from(shotDetailHero.data, 'base64'));
    console.log('Saved arkcv_case_study_hero.png');

    // ArkCV Case Study Detail - Mid (Flow Diagram & Transformation)
    await targetSend('Runtime.evaluate', { expression: `window.scrollBy(0, 1100)` });
    await delay(800);
    const shotDetailMid = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('arkcv_case_study_mid.png', Buffer.from(shotDetailMid.data, 'base64'));
    console.log('Saved arkcv_case_study_mid.png');

    // 2. Case Studies Index
    await targetSend('Page.navigate', { url: 'http://localhost:3000/case-study' });
    await delay(2500);
    const shotIndex = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('arkcv_case_studies_index.png', Buffer.from(shotIndex.data, 'base64'));
    console.log('Saved arkcv_case_studies_index.png');

    // 3. Home Page - Featured Works
    await targetSend('Page.navigate', { url: 'http://localhost:3000/' });
    await delay(4500);
    await targetSend('Runtime.evaluate', {
      expression: `
        window.scrollTo(0, 1950);
      `
    });
    await delay(1000);
    const shotHome = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('arkcv_home_featured.png', Buffer.from(shotHome.data, 'base64'));
    console.log('Saved arkcv_home_featured.png');

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

takeArkcvShots().catch(console.error);

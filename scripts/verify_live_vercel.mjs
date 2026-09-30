import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9265;
const LIVE_URL = 'https://yug-designsite.vercel.app/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function verifyLiveVercel() {
  console.log('==================================================');
  console.log('STARTING LIVE VERCEL POST-DEPLOYMENT VERIFICATION');
  console.log('URL:', LIVE_URL);
  console.log('==================================================\n');

  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-live-')
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

    await targetSend('Page.navigate', { url: LIVE_URL });
    await delay(3500);

    const renderData = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        const isVis = (el) => {
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        };
        return {
          bio: isVis(document.querySelector('#mainbio')),
          story: isVis(document.querySelector('#my-story')),
          work: isVis(document.querySelector('#work')),
          awards: isVis(document.querySelector('#awards')),
          nav: isVis(document.querySelector('.framer-rmz83s')),
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth
        };
      })()`,
      returnByValue: true
    });

    console.log('Live Render Verification:', renderData.result.value);

    // Test Repel Physics on live site
    const repelTest = await targetSend('Runtime.evaluate', {
      expression: `(async () => {
        const getTransform = () => document.querySelector('[data-framer-name="Cursor Tag"]')?.style.transform || 'none';
        const t1 = getTransform();
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 300, clientY: 300, bubbles: true }));
        await new Promise(r => setTimeout(r, 200));
        const t2 = getTransform();
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 700, clientY: 700, bubbles: true }));
        await new Promise(r => setTimeout(r, 200));
        const t3 = getTransform();
        return { initial: t1, pos1: t2, pos2: t3, animated: t1 !== t2 || t2 !== t3 };
      })()`,
      awaitPromise: true,
      returnByValue: true
    });

    console.log('Live Animation Physics:', repelTest.result.value);

    const liveShot = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('live_vercel_verified.png', Buffer.from(liveShot.data, 'base64'));
    console.log('Live screenshot saved to live_vercel_verified.png');

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

verifyLiveVercel().catch(console.error);

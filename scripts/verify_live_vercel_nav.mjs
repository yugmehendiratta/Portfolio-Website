import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9286;
const TARGET_URL = 'https://yug-designsite.vercel.app/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function verifyLiveVercel() {
  console.log('==================================================');
  console.log('VERIFYING LIVE VERCEL PRODUCTION DEPLOYMENT');
  console.log('==================================================\n');

  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-live-nav-')
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

    console.log('--- TESTING LIVE DESKTOP 1440x900 ---');
    await targetSend('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await targetSend('Page.navigate', { url: TARGET_URL });
    await delay(3500);

    const desktopCheck = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        const nav = document.querySelector('.framer-rmz83s');
        const nr = nav ? nav.getBoundingClientRect() : null;
        const links = Array.from(document.querySelectorAll('.framer-rmz83s a')).map(a => {
          const r = a.getBoundingClientRect();
          return {
            text: a.innerText.trim(),
            rect: { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), height: Math.round(r.height) },
            visible: r.top >= 0 && r.bottom <= window.innerHeight && r.left >= 0 && r.right <= window.innerWidth
          };
        });

        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          navRect: nr ? { top: Math.round(nr.top), bottom: Math.round(nr.bottom), left: Math.round(nr.left), right: Math.round(nr.right), height: Math.round(nr.height) } : null,
          dockFullyInside: nr ? (nr.top >= 0 && nr.bottom <= window.innerHeight && nr.left >= 0 && nr.right <= window.innerWidth) : false,
          links,
          all4ItemsVisible: links.length === 4 && links.every(l => l.visible)
        };
      })()`,
      returnByValue: true
    });

    console.log('Live Desktop Verification:', JSON.stringify(desktopCheck.result.value, null, 2));

    const shotDesktop = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('live_vercel_nav_verified.png', Buffer.from(shotDesktop.data, 'base64'));

    console.log('\nLive verification completed successfully!');
    ws.close();
  } finally {
    chromeProc.kill();
  }
}

verifyLiveVercel().catch(console.error);

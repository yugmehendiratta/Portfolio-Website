import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = Math.floor(Math.random() * 5000) + 9000;
const TARGET_URL = 'http://localhost:3000/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function testClicks() {
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-click-')
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

    const labels = ['BIO', 'STORY', 'WORK', 'AWARDS'];
    const results = [];

    for (const label of labels) {
      const clickRes = await targetSend('Runtime.evaluate', {
        expression: `(() => {
          const links = Array.from(document.querySelectorAll('a, button, [role="button"], div')).filter(el => {
            return el.textContent && el.textContent.trim().toUpperCase() === '${label}';
          });
          const target = links[0];
          if (target) {
            target.click();
            return { clicked: true, text: target.textContent.trim() };
          }
          return { clicked: false };
        })()`,
        returnByValue: true
      });

      await delay(1200);

      const stateRes = await targetSend('Runtime.evaluate', {
        expression: `(() => {
          const scrollY = window.scrollY;
          // Check which nav item is active
          const navItems = Array.from(document.querySelectorAll('a, div')).filter(el => {
            const t = el.textContent && el.textContent.trim().toUpperCase();
            return ['BIO', 'STORY', 'WORK', 'AWARDS'].includes(t) && el.offsetWidth < 80;
          }).map(el => ({
            label: el.textContent.trim().toUpperCase(),
            bg: window.getComputedStyle(el).backgroundColor
          }));

          return { scrollY, navItems };
        })()`,
        returnByValue: true
      });

      results.push({ label, clickRes: clickRes.result.value, state: stateRes.result.value });
    }

    console.log(JSON.stringify(results, null, 2));

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

testClicks().catch(console.error);

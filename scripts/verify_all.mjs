import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9224;

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
    await targetSend('Console.enable');

    const consoleLogs = [];
    ws.addEventListener('message', (msg) => {
      const d = JSON.parse(msg.data);
      if (d.method === 'Runtime.consoleAPICalled' || d.method === 'Console.messageAdded') {
        consoleLogs.push(d);
      }
    });

    const testViewports = [
      { name: '1440x900', width: 1440, height: 900 },
      { name: '1024x768', width: 1024, height: 768 },
      { name: '768x1024', width: 768, height: 1024 },
      { name: '375x812', width: 375, height: 812 }
    ];

    for (const vp of testViewports) {
      await targetSend('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 800
      });

      await targetSend('Page.navigate', { url: 'http://localhost:3000/about' });
      await delay(2000);

      const metrics = await targetSend('Runtime.evaluate', {
        expression: `(() => {
          const sections = ['#mainbio', '#my-story', '#work', '#awards'];
          const data = {};
          const vpW = window.innerWidth;
          const scrollW = document.documentElement.scrollWidth;
          
          for (const s of sections) {
            const el = document.querySelector(s);
            if (!el) { data[s] = 'MISSING'; continue; }
            const r = el.getBoundingClientRect();
            data[s] = {
              left: Math.round(r.left),
              right: Math.round(r.right),
              width: Math.round(r.width),
              height: Math.round(r.height),
              isClippedLeft: r.left < 0,
              isClippedRight: r.right > vpW
            };
          }

          // Check story cards specifically
          const storyCards = Array.from(document.querySelectorAll('#my-story .framer-6A3Mg')).map((c, i) => {
            const r = c.getBoundingClientRect();
            return {
              card: i + 1,
              left: Math.round(r.left),
              right: Math.round(r.right),
              width: Math.round(r.width),
              clipped: r.left < 0 || r.right > vpW
            };
          });

          return {
            viewportWidth: vpW,
            documentScrollWidth: scrollW,
            hasHorizontalOverflow: scrollW > vpW,
            sections: data,
            storyCards
          };
        })()`,
        returnByValue: true
      });

      console.log(`\n========================================`);
      console.log(`=== VIEWPORT: ${vp.name} ===`);
      console.log(`========================================`);
      console.log(JSON.stringify(metrics.result.value, null, 2));

      const shot = await targetSend('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
      fs.writeFileSync(`screenshot_${vp.name}.png`, Buffer.from(shot.data, 'base64'));
    }

    console.log('\n--- Console Logs Summary ---');
    console.log(`Total console messages: ${consoleLogs.length}`);
    const errors = consoleLogs.filter(l => l.params?.type === 'error' || l.params?.level === 'error');
    console.log(`Console errors: ${errors.length}`);
    if (errors.length > 0) {
      console.log('Errors:', JSON.stringify(errors, null, 2));
    }

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

run().catch(console.error);

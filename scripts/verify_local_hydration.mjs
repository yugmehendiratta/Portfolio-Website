import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9232;
const TARGET_URL = 'http://localhost:3000/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function testHydration() {
  console.log(`Starting headless Chrome to verify ${TARGET_URL}...`);
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-local-test-')
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

    const consoleErrors = [];
    ws.addEventListener('message', (msg) => {
      const d = JSON.parse(msg.data);
      if (d.method === 'Runtime.consoleAPICalled' && (d.params.type === 'error' || d.params.type === 'warning')) {
        consoleErrors.push({ type: 'console', level: d.params.type, args: d.params.args });
      } else if (d.method === 'Console.messageAdded' && d.params.message.level === 'error') {
        consoleErrors.push({ type: 'console_msg', text: d.params.message.text });
      } else if (d.method === 'Runtime.exceptionThrown') {
        consoleErrors.push({ type: 'exception', details: d.params.exceptionDetails });
      }
    });

    const viewports = [
      { name: '1440x900', width: 1440, height: 900, mobile: false },
      { name: '768x1024', width: 768, height: 1024, mobile: true },
      { name: '375x812', width: 375, height: 812, mobile: true }
    ];

    for (const vp of viewports) {
      console.log(`\nTesting ${vp.name}...`);
      await targetSend('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile
      });

      await targetSend('Page.navigate', { url: TARGET_URL });
      await delay(3000); // Allow full load and hydration

      const data = await targetSend('Runtime.evaluate', {
        expression: `(() => {
          const sections = ['#mainbio', '#my-story', '#work', '#awards'];
          const secData = {};
          for (const s of sections) {
            const el = document.querySelector(s);
            if (!el) { secData[s] = 'NOT FOUND'; continue; }
            const r = el.getBoundingClientRect();
            secData[s] = {
              exists: true,
              visible: r.width > 0 && r.height > 0,
              width: Math.round(r.width),
              height: Math.round(r.height),
              left: Math.round(r.left),
              right: Math.round(r.right),
              top: Math.round(r.top + window.scrollY)
            };
          }

          const storyCards = Array.from(document.querySelectorAll('#my-story .framer-6A3Mg')).length;
          const bodyText = document.body.innerText;
          const legacyFound = ['BEJAMAN', 'Bejaman', 'Benjamin', 'Chicago, IL', 'Meridian Health', 'Searchless AI', 'StyleBook', 'Homestead', 'North Light'].filter(k => bodyText.includes(k));
          const hasCert = /certificate/i.test(bodyText);

          return {
            url: window.location.href,
            scrollWidth: document.documentElement.scrollWidth,
            scrollHeight: document.documentElement.scrollHeight,
            sections: secData,
            storyCardsCount: storyCards,
            legacyFound,
            hasCertificate: hasCert,
            bodySnippet: bodyText.slice(0, 300).replace(/\\n/g, ' ')
          };
        })()`,
        returnByValue: true
      });

      console.log('Result for ' + vp.name + ':\n', JSON.stringify(data.result.value, null, 2));

      const shot = await targetSend('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
      fs.writeFileSync(`verified_local_${vp.name}.png`, Buffer.from(shot.data, 'base64'));
      console.log(`Saved screenshot: verified_local_${vp.name}.png`);
    }

    console.log('\n--- Console Errors/Exceptions Summary ---');
    console.log(`Total errors/exceptions: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log(JSON.stringify(consoleErrors, null, 2));
    } else {
      console.log(' ZERO ERRORS! ZERO EXCEPTIONS! ZERO HYDRATION WARNINGS!');
    }

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

testHydration().catch(console.error);

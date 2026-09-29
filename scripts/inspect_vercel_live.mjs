import fs from 'node:fs';
import { spawnSync, spawn } from 'node:child_process';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9234;
const TARGET_URL = 'https://yug-designsite.vercel.app/about';
const BUNDLE_URL = 'https://yug-designsite.vercel.app/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function inspectVercel() {
  console.log('--- 1. HTTP HEADERS CHECK ---');
  const pageRes = await fetch(TARGET_URL);
  console.log(`Page URL: ${TARGET_URL}`);
  console.log(`Status: ${pageRes.status} ${pageRes.statusText}`);
  console.log('Page Headers:');
  for (const [k, v] of pageRes.headers.entries()) {
    if (k.includes('vercel') || k.includes('cache') || k.includes('age') || k.includes('date') || k.includes('etag')) {
      console.log(`  ${k}: ${v}`);
    }
  }

  const bundleRes = await fetch(BUNDLE_URL);
  console.log(`\nBundle URL: ${BUNDLE_URL}`);
  console.log(`Status: ${bundleRes.status} ${bundleRes.statusText}`);
  console.log('Bundle Headers:');
  for (const [k, v] of bundleRes.headers.entries()) {
    if (k.includes('vercel') || k.includes('cache') || k.includes('age') || k.includes('date') || k.includes('etag')) {
      console.log(`  ${k}: ${v}`);
    }
  }

  const liveBundleCode = await bundleRes.text();
  fs.writeFileSync('vercel_live_bundle.mjs', liveBundleCode);
  console.log(`\nLive bundle downloaded, length: ${liveBundleCode.length} bytes`);

  const localBundleCode = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');
  console.log(`Local bundle length: ${localBundleCode.length} bytes`);

  const isIdentical = liveBundleCode === localBundleCode;
  console.log(`Is live bundle IDENTICAL to local fixed bundle? ${isIdentical}`);

  // Check specific fix tokens
  const hasFixedNrOiv = liveBundleCode.includes('`framer-NrOiv`)),$.displayName');
  const hasOldNrOiv = liveBundleCode.includes('`framer-NrOiv`),$.displayName');
  console.log(`Live bundle has fixedNrOiv: ${hasFixedNrOiv}`);
  console.log(`Live bundle has oldNrOiv: ${hasOldNrOiv}`);

  const checkRes = spawnSync('node', ['--check', 'vercel_live_bundle.mjs'], { encoding: 'utf8' });
  console.log(`Live bundle node --check exit code: ${checkRes.status}`);
  if (checkRes.status !== 0) {
    console.log(`Live bundle node --check error: ${checkRes.stderr}`);
  } else {
    console.log(`Live bundle node --check: CLEAN PASS!`);
  }

  console.log('\n--- 2. BROWSER RUNTIME / CDP CHECK ---');
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-qa-live-')
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

    const consoleEvents = [];
    ws.addEventListener('message', (msg) => {
      const d = JSON.parse(msg.data);
      if (d.method === 'Runtime.consoleAPICalled') {
        consoleEvents.push({ type: 'console', level: d.params.type, args: d.params.args });
      } else if (d.method === 'Console.messageAdded') {
        consoleEvents.push({ type: 'msg', level: d.params.message.level, text: d.params.message.text });
      } else if (d.method === 'Runtime.exceptionThrown') {
        consoleEvents.push({ type: 'exception', text: d.params.exceptionDetails.text, desc: d.params.exceptionDetails.exception?.description });
      }
    });

    await targetSend('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await targetSend('Page.navigate', { url: TARGET_URL });
    await delay(3500);

    const domInfo = await targetSend('Runtime.evaluate', {
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
        return {
          title: document.title,
          scrollWidth: document.documentElement.scrollWidth,
          scrollHeight: document.documentElement.scrollHeight,
          sections: secData,
          bodySnippet: document.body.innerText.slice(0, 300).replace(/\\n/g, ' ')
        };
      })()`,
      returnByValue: true
    });

    console.log('\nDOM Evaluation on live Vercel at 1440x900:\n', JSON.stringify(domInfo.result.value, null, 2));

    const shot = await targetSend('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    fs.writeFileSync('live_vercel_1440x900_now.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot: live_vercel_1440x900_now.png');

    console.log(`\nConsole events on live Vercel: ${consoleEvents.length}`);
    if (consoleEvents.length > 0) {
      console.log('Errors/Exceptions:', JSON.stringify(consoleEvents.filter(e => e.level === 'error' || e.type === 'exception'), null, 2));
    }

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

inspectVercel().catch(console.error);

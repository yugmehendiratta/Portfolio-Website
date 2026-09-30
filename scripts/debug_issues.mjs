import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9276;
const TARGET_URL = 'http://localhost:3000/about';

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
    await targetSend('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await targetSend('Page.navigate', { url: TARGET_URL });
    await delay(3000);

    const getNavState = async (label) => {
      const res = await targetSend('Runtime.evaluate', {
        expression: `(() => {
          const navLinks = Array.from(document.querySelectorAll('.framer-rmz83s a')).map(a => ({
            text: a.innerText.trim(),
            href: a.getAttribute('href'),
            bgColor: window.getComputedStyle(a).backgroundColor,
            className: a.className,
            framerName: a.getAttribute('data-framer-name')
          }));
          const scrollY = window.scrollY;
          return { label: '${label}', scrollY, navLinks };
        })()`,
        returnByValue: true
      });
      return res.result.value;
    };

    console.log('--- Initial State (Scroll 0) ---');
    console.log(JSON.stringify(await getNavState('Scroll 0'), null, 2));

    console.log('--- Scroll to Story (1200) ---');
    await targetSend('Runtime.evaluate', { expression: `window.scrollTo({ top: 1200, behavior: 'instant' })` });
    await delay(500);
    console.log(JSON.stringify(await getNavState('Scroll Story 1200'), null, 2));

    console.log('--- Scroll to Work (2500) ---');
    await targetSend('Runtime.evaluate', { expression: `window.scrollTo({ top: 2500, behavior: 'instant' })` });
    await delay(500);
    console.log(JSON.stringify(await getNavState('Scroll Work 2500'), null, 2));

    console.log('--- Scroll to Awards (3600) ---');
    await targetSend('Runtime.evaluate', { expression: `window.scrollTo({ top: 3600, behavior: 'instant' })` });
    await delay(500);
    console.log(JSON.stringify(await getNavState('Scroll Awards 3600'), null, 2));

    // Test clicking on each nav link
    console.log('--- Testing Nav Clicks ---');
    await targetSend('Runtime.evaluate', { expression: `window.scrollTo({ top: 0, behavior: 'instant' })` });
    await delay(500);

    const linksCount = 4;
    for (let i = 0; i < linksCount; i++) {
      const clickInfo = await targetSend('Runtime.evaluate', {
        expression: `(() => {
          const links = Array.from(document.querySelectorAll('.framer-rmz83s a'));
          const target = links[${i}];
          if (!target) return { found: false };
          target.click();
          return { found: true, text: target.innerText.trim(), href: target.getAttribute('href') };
        })()`,
        returnByValue: true
      });
      await delay(1000);
      const afterScroll = await targetSend('Runtime.evaluate', { expression: `window.scrollY` });
      console.log(`Clicked link ${i}:`, clickInfo.result.value, '-> Resulting ScrollY:', afterScroll.result.value);
    }

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

run().catch(console.error);

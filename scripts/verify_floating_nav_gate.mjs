import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9285;
const TARGET_URL = 'http://localhost:3000/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function verifyFloatingNavGate() {
  console.log('==================================================');
  console.log('STARTING FLOATING NAV GATE VERIFICATION');
  console.log('==================================================\n');

  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-nav-final-')
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

    // -------------------------------------------------------------
    // TEST 1: DESKTOP 1440x900
    // -------------------------------------------------------------
    console.log('--- TEST 1: DESKTOP 1440x900 ---');
    await targetSend('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await targetSend('Page.navigate', { url: TARGET_URL });
    await delay(3000);

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

        const cursorTags = Array.from(document.querySelectorAll('[data-framer-name="Cursor Tag"]')).map(el => {
          const r = el.getBoundingClientRect();
          return {
            text: el.innerText.trim(),
            rect: { top: Math.round(r.top), left: Math.round(r.left) },
            visible: r.width > 0 && r.height > 0
          };
        });

        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          navRect: nr ? { top: Math.round(nr.top), bottom: Math.round(nr.bottom), left: Math.round(nr.left), right: Math.round(nr.right), height: Math.round(nr.height) } : null,
          dockFullyInside: nr ? (nr.top >= 0 && nr.bottom <= window.innerHeight && nr.left >= 0 && nr.right <= window.innerWidth) : false,
          links,
          all4ItemsVisible: links.length === 4 && links.every(l => l.visible),
          cursorTags
        };
      })()`,
      returnByValue: true
    });

    console.log('Desktop Check:', JSON.stringify(desktopCheck.result.value, null, 2));

    const shotDesktop = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('nav_verified_desktop_1440.png', Buffer.from(shotDesktop.data, 'base64'));

    // Test Navigation Clicks at Desktop
    console.log('\n--- TEST NAVIGATION CLICKS ON DESKTOP ---');
    const navClickTest = await targetSend('Runtime.evaluate', {
      expression: `(async () => {
        const tests = [
          { name: 'BIO', sel: '#mainbio', text: 'Bio' },
          { name: 'STORY', sel: '#my-story', text: 'Story' },
          { name: 'WORK', sel: '#work', text: 'Work' },
          { name: 'AWARDS', sel: '#awards', text: 'Awards' }
        ];
        const results = [];
        for (const t of tests) {
          const link = Array.from(document.querySelectorAll('.framer-rmz83s a')).find(a => a.innerText.trim().toLowerCase() === t.text.toLowerCase() || a.href.includes(t.sel.replace('#', '')));
          const el = document.querySelector(t.sel);
          if (!link) { results.push({ name: t.name, found: false }); continue; }
          link.click();
          await new Promise(r => setTimeout(r, 900));
          const r = el ? el.getBoundingClientRect() : null;
          results.push({
            name: t.name,
            scrollY: Math.round(window.scrollY),
            targetTop: r ? Math.round(r.top) : null,
            inView: r ? (r.top >= -150 && r.top <= window.innerHeight) : false
          });
        }
        return results;
      })()`,
      awaitPromise: true,
      returnByValue: true
    });
    console.log('Nav Click Results:', navClickTest.result.value);

    // -------------------------------------------------------------
    // TEST 2: TABLET 768x1024
    // -------------------------------------------------------------
    console.log('\n--- TEST 2: TABLET 768x1024 ---');
    await targetSend('Emulation.setDeviceMetricsOverride', { width: 768, height: 1024, deviceScaleFactor: 1, mobile: true });
    await targetSend('Page.navigate', { url: TARGET_URL });
    await delay(3000);

    const tabletCheck = await targetSend('Runtime.evaluate', {
      expression: `(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth
      }))()`,
      returnByValue: true
    });
    console.log('Tablet Check:', tabletCheck.result.value);

    const shotTablet = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('nav_verified_tablet_768.png', Buffer.from(shotTablet.data, 'base64'));

    // -------------------------------------------------------------
    // TEST 3: MOBILE 375x812
    // -------------------------------------------------------------
    console.log('\n--- TEST 3: MOBILE 375x812 ---');
    await targetSend('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 1, mobile: true });
    await targetSend('Page.navigate', { url: TARGET_URL });
    await delay(3000);

    const mobileCheck = await targetSend('Runtime.evaluate', {
      expression: `(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth
      }))()`,
      returnByValue: true
    });
    console.log('Mobile Check:', mobileCheck.result.value);

    const shotMobile = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('nav_verified_mobile_375.png', Buffer.from(shotMobile.data, 'base64'));

    console.log('\nAll tests completed successfully!');
    ws.close();
  } finally {
    chromeProc.kill();
  }
}

verifyFloatingNavGate().catch(console.error);

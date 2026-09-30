import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9287;
const TARGET_URL = 'http://localhost:3000/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function verifyRevertState() {
  console.log('==================================================');
  console.log('VERIFYING REVERTED ABOUT PAGE STATE');
  console.log('==================================================\n');

  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-revert-')
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

    const consoleErrors = [];
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.method === 'Runtime.consoleAPICalled' && data.params.type === 'error') {
        consoleErrors.push(data.params.args.map(a => a.value || a.description).join(' '));
      }
      if (data.method === 'Runtime.exceptionThrown') {
        consoleErrors.push(data.params.exceptionDetails.text + ' ' + (data.params.exceptionDetails.exception?.description || ''));
      }
      if (data.id && callbacks.has(data.id)) {
        callbacks.get(data.id)(data);
        callbacks.delete(data.id);
      }
    };

    await targetSend('Page.enable');
    await targetSend('Runtime.enable');

    // -------------------------------------------------------------
    // TEST 1: DESKTOP 1440x900
    // -------------------------------------------------------------
    console.log('--- TEST 1: DESKTOP 1440x900 ---');
    await targetSend('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await targetSend('Page.navigate', { url: TARGET_URL });
    await delay(3500);

    const desktopCheck = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        const sections = {
          bio: !!document.querySelector('#mainbio'),
          story: !!document.querySelector('#my-story'),
          work: !!document.querySelector('#work'),
          awards: !!document.querySelector('#awards')
        };
        
        const cursorTags = Array.from(document.querySelectorAll('[data-framer-name="Cursor Tag"]')).map(el => ({
          text: el.innerText.trim(),
          visible: el.getBoundingClientRect().width > 0
        }));

        const nav = document.querySelector('.framer-rmz83s');
        const nr = nav ? nav.getBoundingClientRect() : null;
        
        const animatedChars = document.querySelectorAll('.framer-1vsjwpg-container [data-framer-name="Letter"]');

        return {
          pageTitle: document.title,
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth,
          sections,
          cursorTags,
          animatedCharsCount: animatedChars.length,
          navRect: nr ? { top: Math.round(nr.top), left: Math.round(nr.left), width: Math.round(nr.width), height: Math.round(nr.height) } : null,
          hasFullWidthNavBands: nr ? nr.width > 300 : false
        };
      })()`,
      returnByValue: true
    });

    console.log('Desktop Results:', JSON.stringify(desktopCheck.result.value, null, 2));

    const shotDesktop = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('revert_verified_desktop_1440.png', Buffer.from(shotDesktop.data, 'base64'));

    // Test Repel & Scroll
    console.log('\n--- TESTING CURSOR REPEL & SCROLL INTERACTION ---');
    await targetSend('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 1090, y: 740 });
    await delay(500);

    const repelCheck = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        const bioTag = document.querySelector('.framer-1yo890v');
        return {
          bioTagTransform: bioTag ? bioTag.style.transform : null,
          bioTagComputed: bioTag ? window.getComputedStyle(bioTag).transform : null
        };
      })()`,
      returnByValue: true
    });
    console.log('Repel Animation Check:', repelCheck.result.value);

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
        noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth,
        bio: !!document.querySelector('#mainbio'),
        story: !!document.querySelector('#my-story'),
        work: !!document.querySelector('#work'),
        awards: !!document.querySelector('#awards')
      }))()`,
      returnByValue: true
    });
    console.log('Tablet Results:', tabletCheck.result.value);

    const shotTablet = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('revert_verified_tablet_768.png', Buffer.from(shotTablet.data, 'base64'));

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
        noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth,
        bio: !!document.querySelector('#mainbio'),
        story: !!document.querySelector('#my-story'),
        work: !!document.querySelector('#work'),
        awards: !!document.querySelector('#awards')
      }))()`,
      returnByValue: true
    });
    console.log('Mobile Results:', mobileCheck.result.value);

    const shotMobile = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('revert_verified_mobile_375.png', Buffer.from(shotMobile.data, 'base64'));

    console.log('\n--- CONSOLE / HYDRATION ERRORS ---');
    console.log('Errors caught:', consoleErrors.length === 0 ? 'NONE (0 errors)' : consoleErrors);

    console.log('\nRevert verification completed successfully!');
    ws.close();
  } finally {
    chromeProc.kill();
  }
}

verifyRevertState().catch(console.error);

import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9275;
const TARGET_URL = 'http://localhost:3000/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function testNavFix() {
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-fixtest-')
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

    // Apply fixed left positioning style for desktop
    await targetSend('Runtime.evaluate', {
      expression: `(() => {
        const style = document.createElement('style');
        style.id = 'fix-nav-desktop';
        style.innerHTML = \`
          @media (min-width: 1200px) {
            .framer-NrOiv .framer-1ukjnmv {
              position: fixed !important;
              left: 48px !important;
              top: 50% !important;
              transform: translateY(-50%) !important;
              z-index: 50 !important;
              width: min-content !important;
              height: min-content !important;
              margin: 0 !important;
            }
          }
        \`;
        document.head.appendChild(style);
      })()`
    });
    await delay(500);

    // Test at Scroll Y = 0 (Bio)
    const shot0 = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('nav_fix_test_scroll_0.png', Buffer.from(shot0.data, 'base64'));

    // Test at Scroll Y = 1200 (Story)
    await targetSend('Runtime.evaluate', { expression: `window.scrollTo({ top: 1200, behavior: 'instant' })` });
    await delay(500);
    const shot1 = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('nav_fix_test_scroll_story.png', Buffer.from(shot1.data, 'base64'));

    // Test at Scroll Y = 2400 (Work)
    await targetSend('Runtime.evaluate', { expression: `window.scrollTo({ top: 2400, behavior: 'instant' })` });
    await delay(500);
    const shot2 = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('nav_fix_test_scroll_work.png', Buffer.from(shot2.data, 'base64'));

    // Test at Scroll Y = 3600 (Awards)
    await targetSend('Runtime.evaluate', { expression: `window.scrollTo({ top: 3600, behavior: 'instant' })` });
    await delay(500);
    const shot3 = await targetSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('nav_fix_test_scroll_awards.png', Buffer.from(shot3.data, 'base64'));

    // Verify all 4 links bounding rects at Scroll Y = 3600
    const checkRects = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        const nav = document.querySelector('.framer-rmz83s');
        const r = nav ? nav.getBoundingClientRect() : null;
        const links = Array.from(document.querySelectorAll('.framer-rmz83s a')).map(a => {
          const lr = a.getBoundingClientRect();
          return {
            text: a.innerText.trim(),
            top: lr.top,
            bottom: lr.bottom,
            visible: lr.top >= 0 && lr.bottom <= window.innerHeight
          };
        });
        return {
          navRect: r ? { top: r.top, bottom: r.bottom, left: r.left, right: r.right, height: r.height } : null,
          links,
          allVisible: links.every(l => l.visible)
        };
      })()`,
      returnByValue: true
    });

    console.log('Nav Fixed Rects Check:\n', JSON.stringify(checkRects.result.value, null, 2));

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

testNavFix().catch(console.error);

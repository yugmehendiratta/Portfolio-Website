import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getDebuggerUrl() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://localhost:${PORT}/json/version`);
      const json = await res.json();
      if (json.webSocketDebuggerUrl) return json.webSocketDebuggerUrl;
    } catch (e) {
      await delay(200);
    }
  }
  throw new Error('Could not connect to Chrome debugger');
}

class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();
    this.ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id && this.callbacks.has(data.id)) {
        this.callbacks.get(data.id)(data);
        this.callbacks.delete(data.id);
      }
    };
  }

  ready() {
    return new Promise((resolve) => {
      if (this.ws.readyState === WebSocket.OPEN) return resolve();
      this.ws.onopen = resolve;
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, (res) => {
        if (res.error) reject(res.error);
        else resolve(res.result);
      });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.ws.close();
  }
}

async function run() {
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-profile-')
  ]);

  try {
    const wsUrl = await getDebuggerUrl();
    const cdp = new CDP(wsUrl);
    await cdp.ready();

    // Create a new target/page
    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });

    // Target CDP helper
    const targetSend = (method, params = {}) => {
      return new Promise((resolve, reject) => {
        const id = cdp.id++;
        cdp.callbacks.set(id, (res) => {
          if (res.error) reject(res.error);
          else resolve(res.result);
        });
        cdp.ws.send(JSON.stringify({ id, method, params, sessionId }));
      });
    };

    await targetSend('Page.enable');
    await targetSend('DOM.enable');
    await targetSend('Runtime.enable');

    const viewports = [
      { name: 'desktop_1440', width: 1440, height: 900 },
      { name: 'tablet_768', width: 768, height: 1024 },
      { name: 'mobile_375', width: 375, height: 812 }
    ];

    for (const vp of viewports) {
      await targetSend('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 800
      });

      await targetSend('Page.navigate', { url: 'http://localhost:3000/about' });
      await delay(2000);

      // Measure layout
      const evalRes = await targetSend('Runtime.evaluate', {
        expression: `(() => {
          const getInfo = (selector) => {
            const el = document.querySelector(selector);
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);
            return {
              selector,
              rect: {
                x: Math.round(rect.x),
                y: Math.round(rect.y),
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                left: Math.round(rect.left),
                right: Math.round(rect.right)
              },
              display: style.display,
              width: style.width,
              maxWidth: style.maxWidth,
              left: style.left,
              transform: style.transform
            };
          };

          return {
            viewportWidth: window.innerWidth,
            documentScrollWidth: document.documentElement.scrollWidth,
            nav: getInfo('.framer-1ukjnmv'),
            nav_list: getInfo('.framer-rmz83s'),
            heading: getInfo('.framer-1pltn3m'),
            content_col: getInfo('.framer-94tkti'),
            list_content: getInfo('.framer-me803a'),
            mainbio: getInfo('#mainbio'),
            mainbio_box: getInfo('#mainbio .framer-1y1mzru'),
            mystory: getInfo('#my-story'),
            mystory_box: getInfo('#my-story .framer-ixsok6'),
            mystory_grid: getInfo('#my-story .framer-mpn7rf'),
            mystory_card1: getInfo('#my-story .framer-15xqkt6-container'),
            mystory_note1: getInfo('#my-story .framer-1mk7bzi'),
            work: getInfo('#work'),
            work_box: getInfo('#work .framer-1ql5gwc'),
            awards: getInfo('#awards'),
            awards_box: getInfo('#awards .framer-1ql5gwc')
          };
        })()`,
        returnByValue: true
      });

      console.log(`\n========================================`);
      console.log(`=== VIEWPORT ${vp.name} (${vp.width}x${vp.height}) ===`);
      console.log(`========================================`);
      console.log(JSON.stringify(evalRes.value, null, 2));

      // Capture screenshot
      const shot = await targetSend('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
      fs.writeFileSync(`screenshot_${vp.name}.png`, Buffer.from(shot.data, 'base64'));
      console.log(`Saved screenshot_${vp.name}.png`);
    }

    cdp.close();
  } finally {
    chromeProc.kill();
  }
}

run().catch(console.error);

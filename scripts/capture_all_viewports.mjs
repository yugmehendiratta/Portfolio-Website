import { spawn } from 'child_process';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureViewport(width, height, filename) {
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9231',
    '--no-first-run',
    '--disable-gpu',
    `--window-size=${width},${height}`,
    'about:blank'
  ]);

  try {
    await new Promise(r => setTimeout(r, 1200));
    const targets = await fetch('http://127.0.0.1:9231/json').then(r => r.json());
    const page = targets.find(t => t.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    let id = 1;
    const callbacks = new Map();
    ws.onmessage = e => {
      const m = JSON.parse(e.data);
      if (callbacks.has(m.id)) {
        callbacks.get(m.id)(m.result);
        callbacks.delete(m.id);
      }
    };
    const send = (method, params = {}) => new Promise(r => {
      const i = id++;
      callbacks.set(i, r);
      ws.send(JSON.stringify({ id: i, method, params }));
    });
    await new Promise(r => ws.onopen = r);
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 600
    });
    await send('Page.navigate', { url: 'http://localhost:3000/about' });
    await new Promise(r => setTimeout(r, 3000));

    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    fs.writeFileSync(filename, Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot to ${filename}`);
    ws.close();
  } finally {
    chromeProcess.kill();
  }
}

async function main() {
  await captureViewport(1440, 900, 'scripts/about_full_1440.png');
  await captureViewport(768, 1024, 'scripts/about_full_768.png');
  await captureViewport(375, 812, 'scripts/about_full_375.png');
  console.log('All screenshots captured!');
}

main().catch(console.error);

import { spawn } from 'child_process';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9232',
    '--no-first-run',
    '--disable-gpu',
    '--window-size=1440,900',
    'about:blank'
  ]);

  try {
    await new Promise(r => setTimeout(r, 1200));
    const targets = await fetch('http://127.0.0.1:9232/json').then(r => r.json());
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
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise(r => setTimeout(r, 3000));

    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    fs.writeFileSync('scripts/home_full_1440.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved home screenshot to scripts/home_full_1440.png');
    ws.close();
  } finally {
    chromeProcess.kill();
  }
}

main().catch(console.error);

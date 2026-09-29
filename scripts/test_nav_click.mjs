import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9225;

async function testNav() {
  const chromeProc = spawn(CHROME_PATH, [
    '--remote-debugging-port=' + PORT,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-test-nav-')
  ]);

  try {
    let wsUrl;
    for (let i = 0; i < 30; i++) {
      try {
        const res = await fetch('http://localhost:' + PORT + '/json/version');
        const json = await res.json();
        if (json.webSocketDebuggerUrl) { wsUrl = json.webSocketDebuggerUrl; break; }
      } catch (e) { await new Promise(r => setTimeout(r, 200)); }
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
    await targetSend('Page.navigate', { url: 'http://localhost:3000/about' });
    await new Promise(r => setTimeout(r, 2500));

    const result = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        const awardsLink = Array.from(document.querySelectorAll("a")).find(a => a.href.includes("#awards"));
        const awardsEl = document.querySelector("#awards");
        const awardsTop = awardsEl ? awardsEl.offsetTop : null;
        if (awardsLink) {
          awardsLink.click();
        }
        return {
          foundLink: !!awardsLink,
          linkHref: awardsLink ? awardsLink.href : null,
          awardsTop
        };
      })()`,
      returnByValue: true
    });

    console.log('Nav check:', result.result.value);
    await new Promise(r => setTimeout(r, 1000));

    const afterScroll = await targetSend('Runtime.evaluate', {
      expression: `({ scrollY: window.scrollY, hash: window.location.hash })`,
      returnByValue: true
    });
    console.log('After click:', afterScroll.result.value);

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

testNav().catch(console.error);

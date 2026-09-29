import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9231;

async function checkImport() {
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-dbg-')
  ]);

  try {
    let wsUrl;
    for (let i = 0; i < 30; i++) {
      try {
        const res = await fetch(`http://localhost:${PORT}/json/version`);
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
    await targetSend('Network.enable');

    const loadedScripts = [];
    ws.addEventListener('message', (msg) => {
      const d = JSON.parse(msg.data);
      if (d.method === 'Network.responseReceived') {
        if (d.params.response.url.endsWith('.mjs') || d.params.response.url.endsWith('.js')) {
          loadedScripts.push(d.params.response.url);
        }
      }
    });

    await targetSend('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await targetSend('Page.navigate', { url: 'https://yug-designsite.vercel.app/about' });
    await new Promise(r => setTimeout(r, 3000));

    console.log('Loaded scripts on live site:');
    loadedScripts.forEach(s => console.log(' -', s));

    // Test importing each chunk directly in page context to find which one throws SyntaxError
    const testResults = await targetSend('Runtime.evaluate', {
      expression: `(async () => {
        const urls = ${JSON.stringify(loadedScripts)};
        const res = [];
        for (const u of urls) {
          try {
            await import(u);
            res.push({ url: u, ok: true });
          } catch (e) {
            res.push({ url: u, ok: false, error: e.message });
          }
        }
        return res;
      })()`,
      awaitPromise: true,
      returnByValue: true
    });

    console.log('\nDynamic import test results:', testResults.result.value);

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

checkImport().catch(console.error);

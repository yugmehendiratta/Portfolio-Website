import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9255;
const TARGET_URL = 'http://localhost:3000/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function testWindowErrors() {
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-winerr-')
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

    // Inject error listeners before navigation
    await targetSend('Page.addScriptToEvaluateOnNewDocument', {
      source: `
        window.__browserErrors = [];
        window.addEventListener('error', (e) => {
          window.__browserErrors.push({ type: 'uncaught_error', message: e.message, filename: e.filename, lineno: e.lineno });
        });
        window.addEventListener('unhandledrejection', (e) => {
          window.__browserErrors.push({ type: 'unhandled_rejection', reason: String(e.reason) });
        });
        const origError = console.error;
        console.error = (...args) => {
          window.__browserErrors.push({ type: 'console_error', text: args.join(' ') });
          origError.apply(console, args);
        };
      `
    });

    await targetSend('Page.navigate', { url: TARGET_URL });
    await delay(3000);

    const check = await targetSend('Runtime.evaluate', {
      expression: `window.__browserErrors`,
      returnByValue: true
    });

    console.log('Browser Uncaught Errors and console.error count:', check.result.value.length);
    console.log('Browser Uncaught Errors details:', JSON.stringify(check.result.value, null, 2));

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

testWindowErrors().catch(console.error);

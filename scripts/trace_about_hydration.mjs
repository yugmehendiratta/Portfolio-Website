import { spawn } from 'child_process';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9228',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  const targets = await fetch('http://127.0.0.1:9228/json').then(r => r.json());
  const pageTarget = targets.find(t => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();
  const logs = [];

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      logs.push({
        type: msg.params.type,
        text: msg.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' ')
      });
    }
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  const send = (method, params = {}) => {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  };

  await new Promise(r => ws.onopen = r);
  await send('Runtime.enable');
  await send('Page.enable');

  // Inject a console hook before hydration
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      window.__hydration_diffs = [];
      const origError = console.error;
      console.error = function(...args) {
        window.__hydration_diffs.push(args.join(' '));
        origError.apply(console, args);
      };
    `
  });

  await send('Page.navigate', { url: 'http://localhost:3000/about' });
  await new Promise(r => setTimeout(r, 3000));

  const diffs = await send('Runtime.evaluate', {
    expression: `window.__hydration_diffs`,
    returnByValue: true
  });

  console.log('Hydration errors / warnings:');
  console.log(JSON.stringify(diffs.result.value, null, 2));

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

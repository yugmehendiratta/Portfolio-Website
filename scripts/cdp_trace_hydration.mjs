import { spawn } from 'child_process';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const targets = await fetch('http://127.0.0.1:9222/json').then(r => r.json());
  const pageTarget = targets.find(t => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();
  const consoleMessages = [];
  const jsExceptions = [];

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      consoleMessages.push({
        type: msg.params.type,
        text: msg.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' ')
      });
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      jsExceptions.push(msg.params.exceptionDetails);
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

  // Navigate to local dev server http://localhost:3000/about
  console.log('--- Navigating to http://localhost:3000/about ---');
  await send('Page.navigate', { url: 'http://localhost:3000/about' });
  await new Promise(r => setTimeout(r, 4000));

  const evalCode = async (expression) => {
    const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return res.result ? res.result.value : null;
  };

  console.log('\n=== LOCAL DEV /about CONSOLE MESSAGES & ERRORS ===');
  console.log('Console messages:', consoleMessages);
  console.log('JS Exceptions:', jsExceptions);

  const localState = await evalCode(`(() => {
    const main = document.getElementById('main');
    const badge = document.getElementById('__framer-badge-container');
    const loopEls = document.querySelectorAll('[data-framer-name*="Rectangle"], [data-framer-name*="Cursor"]');
    
    return {
      mainFound: !!main,
      mainHydrateDataset: main ? main.dataset.framerHydrateV2 : null,
      badgeFound: !!badge,
      loopElementsCount: loopEls.length,
      webAnimationsCount: document.getAnimations().length,
      webAnimations: document.getAnimations().map(a => ({
        playState: a.playState,
        currentTime: a.currentTime
      }))
    };
  })()`);

  console.log('Local /about state:\n', JSON.stringify(localState, null, 2));

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

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
        args: msg.params.args.map(a => a.value || a.description || JSON.stringify(a))
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

  // Inject a script BEFORE page loads to hook window.onerror and unhandledrejection
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      window.__caught_errors = [];
      window.addEventListener('error', (e) => {
        window.__caught_errors.push({ type: 'error', message: e.message, filename: e.filename, lineno: e.lineno, colno: e.colno, error: e.error ? e.error.stack : null });
      });
      window.addEventListener('unhandledrejection', (e) => {
        window.__caught_errors.push({ type: 'unhandledrejection', reason: e.reason ? (e.reason.stack || e.reason.message || String(e.reason)) : null });
      });
    `
  });

  console.log('--- Navigating to https://yug-designsite.vercel.app/about ---');
  await send('Page.navigate', { url: 'https://yug-designsite.vercel.app/about' });
  await new Promise(r => setTimeout(r, 4000));

  const evalCode = async (expression) => {
    const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return res.result ? res.result.value : null;
  };

  const caughtErrors = await evalCode('window.__caught_errors');
  console.log('\n=== CAUGHT ERRORS VIA INJECTED LISTENER ===');
  console.log(JSON.stringify(caughtErrors, null, 2));

  // Now manually import the about bundle and try rendering it
  const manualTest = await evalCode(`(async () => {
    try {
      const mod = await import('/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs');
      return {
        loaded: true,
        hasDefault: !!mod.default,
        keys: Object.keys(mod)
      };
    } catch (e) {
      return {
        loaded: false,
        error: e.message,
        stack: e.stack
      };
    }
  })()`);
  console.log('\n=== MANUAL BUNDLE IMPORT TEST ===');
  console.log(JSON.stringify(manualTest, null, 2));

  // Check if framer root component mounted
  const rootCheck = await evalCode(`(() => {
    const main = document.getElementById('main');
    // Check internal React fiber on #main
    const fiberKey = Object.keys(main || {}).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactContainer'));
    return {
      hasFiber: !!fiberKey,
      fiberKey: fiberKey || null
    };
  })()`);
  console.log('\n=== REACT FIBER ON #MAIN ===');
  console.log(JSON.stringify(rootCheck, null, 2));

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

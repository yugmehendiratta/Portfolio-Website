import { spawn } from 'child_process';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testUrl(url) {
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

  console.log(`\n================ Testing ${url} ================`);
  await send('Page.navigate', { url });
  await new Promise(r => setTimeout(r, 4000));

  console.log('Console messages:', consoleMessages);
  console.log('JS Exceptions count:', jsExceptions.length);
  jsExceptions.forEach(e => console.log('  Exception:', e.exception ? e.exception.description : e.text));

  const evalCode = async (expression) => {
    const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return res.result ? res.result.value : null;
  };

  const pageInfo = await evalCode(`(() => {
    return {
      title: document.title,
      mainDataset: document.getElementById('main') ? document.getElementById('main').dataset.framerHydrateV2 : null,
      scripts: Array.from(document.querySelectorAll('script')).map(s => s.src).filter(Boolean),
      webAnimations: document.getAnimations().length,
      framerEventCount: window.__framer_events ? window.__framer_events.length : 0
    };
  })()`);

  console.log('Page info:', JSON.stringify(pageInfo, null, 2));

  ws.close();
  chromeProcess.kill();
  await new Promise(r => setTimeout(r, 1000));
}

async function main() {
  await testUrl('https://yug-designsite.vercel.app/about');
  await testUrl('https://yug-designsite.vercel.app/');
}

main().catch(console.error);

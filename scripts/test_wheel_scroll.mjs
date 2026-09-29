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

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
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

  await send('Page.navigate', { url: 'https://yug-designsite.vercel.app/about' });
  await new Promise(r => setTimeout(r, 4000));

  const evalCode = async (expression) => {
    const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return res.result ? res.result.value : null;
  };

  const docHeight = await evalCode(`({
    bodyScrollHeight: document.body.scrollHeight,
    documentElementScrollHeight: document.documentElement.scrollHeight,
    innerHeight: window.innerHeight,
    scrollY: window.scrollY
  })`);
  console.log('Doc dimensions:\n', docHeight);

  // Dispatch mouse wheel events to scroll
  console.log('\n--- Scrolling down via mouse wheel ---');
  for (let i = 0; i < 5; i++) {
    await send('Input.dispatchMouseEvent', {
      type: 'mouseWheel',
      x: 500,
      y: 500,
      deltaX: 0,
      deltaY: 500
    });
    await new Promise(r => setTimeout(r, 300));
  }

  const scrolledState = await evalCode(`({
    scrollY: window.scrollY,
    documentScrollTop: document.documentElement.scrollTop,
    bodyScrollTop: document.body.scrollTop
  })`);
  console.log('Scrolled state:', scrolledState);

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

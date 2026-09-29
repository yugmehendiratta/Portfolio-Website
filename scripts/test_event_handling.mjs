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

  // Test Work accordion item click
  const clickTest = await evalCode(`(() => {
    const workItem = document.querySelector('.framer-ec48W') || Array.from(document.querySelectorAll('div')).find(d => d.innerText && d.innerText.includes('Arkanj Tech'));
    if (!workItem) return { found: false };
    
    const beforeHeight = workItem.getBoundingClientRect().height;
    const beforeClasses = workItem.className;

    workItem.click();
    workItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    return {
      found: true,
      beforeHeight,
      afterHeight: workItem.getBoundingClientRect().height,
      beforeClasses,
      afterClasses: workItem.className
    };
  })()`);

  console.log('Work accordion click test:\n', clickTest);

  // Test Top Navigation Links Hover
  const topNavHover = await evalCode(`(() => {
    const navLinks = Array.from(document.querySelectorAll('.framer-JA27q a'));
    return navLinks.map(a => {
      const beforeBg = window.getComputedStyle(a).backgroundColor;
      a.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      a.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      const afterBg = window.getComputedStyle(a).backgroundColor;
      return {
        text: a.innerText.trim(),
        beforeBg,
        afterBg,
        changed: beforeBg !== afterBg
      };
    });
  })()`);
  console.log('Top Nav Links hover test:\n', topNavHover);

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

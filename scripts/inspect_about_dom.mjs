import { spawn } from 'child_process';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9227',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  const targets = await fetch('http://127.0.0.1:9227/json').then(r => r.json());
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

  await send('Page.navigate', { url: 'http://localhost:3000/about' });
  await new Promise(r => setTimeout(r, 4000));

  const result = await send('Runtime.evaluate', {
    expression: `(() => {
      const mainBio = document.querySelector('#mainbio');
      const bioTexts = mainBio ? Array.from(mainBio.querySelectorAll('p, h1, h2, h3, h4, h5, [data-framer-component-type]')).map(el => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          className: el.className,
          text: (el.innerText || '').slice(0, 40),
          rect: { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), height: Math.round(r.height), width: Math.round(r.width) }
        };
      }) : [];

      const button = document.querySelector('.framer-187vpa3');
      const buttonRect = button ? button.getBoundingClientRect() : null;

      const polaroid = document.querySelector('[data-framer-name*="Polaroid"]');
      const polaroidImg = polaroid ? polaroid.querySelector('img')?.src : null;

      return {
        bioTexts,
        buttonRect,
        polaroidImg
      };
    })()`,
    returnByValue: true
  });

  console.log('Result:\n', JSON.stringify(result.result.value, null, 2));

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

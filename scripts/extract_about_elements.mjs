import { spawn } from 'child_process';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function check() {
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9230',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1440,900',
    'about:blank'
  ]);
  await new Promise(r => setTimeout(r, 1500));
  const targets = await fetch('http://127.0.0.1:9230/json').then(r => r.json());
  const pageTarget = targets.find(t => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();
  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (data.id && callbacks.has(data.id)) {
      callbacks.get(data.id)(data);
      callbacks.delete(data.id);
    }
  };
  const send = (method, params = {}) => new Promise((res, rej) => {
    const msgId = id++;
    callbacks.set(msgId, (d) => d.error ? rej(d.error) : res(d.result));
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });
  await new Promise(r => ws.onopen = r);
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', { url: 'http://localhost:3000/about' });
  await new Promise(r => setTimeout(r, 4000));

  const data = await send('Runtime.evaluate', {
    expression: `(() => {
      const allElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, p, [data-framer-name], img')).map(el => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          name: el.getAttribute('data-framer-name') || '',
          className: el.className,
          text: (el.innerText || '').slice(0, 50).replace(/\\n/g, ' '),
          src: el.src || '',
          top: Math.round(rect.top + window.scrollY),
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          visible: rect.width > 0 && rect.height > 0
        };
      }).filter(e => e.visible && (e.text || e.src));

      return {
        count: allElements.length,
        elements: allElements
      };
    })()`,
    returnByValue: true
  });

  console.log('Visible elements on about page:', data.result.value.count);
  fs.writeFileSync('scripts/about_elements.json', JSON.stringify(data.result.value, null, 2));
  console.log('Saved scripts/about_elements.json');

  ws.close();
  chromeProcess.kill();
}
check().catch(console.error);

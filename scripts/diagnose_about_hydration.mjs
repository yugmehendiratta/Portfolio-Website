import { spawn } from 'child_process';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9224',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  const targets = await fetch('http://127.0.0.1:9224/json').then(r => r.json());
  const pageTarget = targets.find(t => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();
  const consoleLogs = [];

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      consoleLogs.push({
        type: msg.params.type,
        args: msg.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' ')
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

  await send('Page.navigate', { url: 'http://localhost:3000/about' });
  await new Promise(r => setTimeout(r, 3000));

  consoleLogs.forEach(l => {
    console.log(`[${l.type}] ${l.args}`);
  });

  const domSummary = await send('Runtime.evaluate', {
    expression: `(() => {
      const bioHeadline = document.querySelector('.framer-1a74d2q');
      const bioText = bioHeadline ? bioHeadline.innerText : null;
      const polaroid = document.querySelector('[data-framer-name*="Polaroid"], img[src*="ae83ab"]');
      const polaroidImg = polaroid ? (polaroid.tagName === 'IMG' ? polaroid.src : (polaroid.querySelector('img') ? polaroid.querySelector('img').src : null)) : null;
      const navItems = Array.from(document.querySelectorAll('nav a, nav button, [data-framer-name*="Nav"] a')).map(a => a.innerText.trim()).filter(Boolean);
      return {
        bioText,
        polaroidImg,
        navItems,
        awardsExists: !!document.querySelector('#awards')
      };
    })()`,
    returnByValue: true
  });

  console.log('DOM Summary:', JSON.stringify(domSummary.result.value, null, 2));

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

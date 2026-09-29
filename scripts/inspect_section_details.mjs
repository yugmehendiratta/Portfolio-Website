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

  const sectionDetails = await evalCode(`(() => {
    function fl(e, t) {
      let n = 0, r = e;
      for (; r && r !== t && r instanceof HTMLElement;) {
        n += r.offsetTop;
        r = r.offsetParent;
      }
      return n;
    }

    const ids = ['mainbio', 'my-story', 'work', 'awards'];
    return ids.map(id => {
      const el = document.getElementById(id);
      return {
        id,
        found: !!el,
        fl: el ? fl(el, document.documentElement) : null,
        offsetTop: el ? el.offsetTop : null,
        offsetParent: el ? el.offsetParent ? el.offsetParent.tagName + '.' + el.offsetParent.className : null : null,
        clientHeight: el ? el.clientHeight : null,
        boundingTop: el ? el.getBoundingClientRect().top : null
      };
    });
  })()`);

  console.log('Section details:\n', JSON.stringify(sectionDetails, null, 2));

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

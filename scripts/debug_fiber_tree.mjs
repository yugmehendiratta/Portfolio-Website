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

  const debugFiberTree = await evalCode(`(() => {
    const el = document.querySelector('.framer-n5931f') || document.querySelector('.framer-1pltn3m');
    if (!el) return { found: false };
    
    // Find fiber
    const key = Object.keys(el).find(k => k.startsWith('__reactFiber'));
    let fiber = el[key];
    
    const tree = [];
    let curr = fiber;
    while (curr) {
      tree.push({
        tag: curr.tag,
        elementType: typeof curr.elementType === 'string' ? curr.elementType : (curr.elementType ? curr.elementType.name || curr.elementType.displayName || 'Component' : null),
        child: !!curr.child,
        sibling: !!curr.sibling,
        return: !!curr.return
      });
      curr = curr.return;
    }

    // Check sibling of n5931f parent or me803a
    const me803a = document.querySelector('.framer-me803a');
    const me803aKey = me803a ? Object.keys(me803a).find(k => k.startsWith('__reactFiber')) : null;

    return {
      tree,
      me803aFound: !!me803a,
      me803aHasFiber: !!me803aKey,
      me803aHTML: me803a ? me803a.outerHTML.slice(0, 300) : null
    };
  })()`);

  console.log('Fiber tree inspection:\n', JSON.stringify(debugFiberTree, null, 2));

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

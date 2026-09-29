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

  const fiberNav = await evalCode(`(() => {
    const pills = Array.from(document.querySelectorAll('.framer-891Ch'));
    return pills.map(p => {
      const key = Object.keys(p).find(k => k.startsWith('__reactFiber'));
      if (!key) return { href: p.getAttribute('href'), hasFiber: false };
      let fiber = p[key];
      // walk up fiber to find props
      let foundProps = null;
      let depth = 0;
      while (fiber && depth < 20) {
        if (fiber.memoizedProps && (fiber.memoizedProps.__framer__targets || fiber.memoizedProps.targets)) {
          foundProps = fiber.memoizedProps;
          break;
        }
        fiber = fiber.return;
        depth++;
      }
      return {
        href: p.getAttribute('href'),
        hasFiber: true,
        hasTargetsProps: !!foundProps,
        targets: foundProps ? (foundProps.__framer__targets || foundProps.targets).map(t => ({
          target: t.target,
          hasRef: !!t.ref,
          refCurrent: t.ref ? (t.ref.current ? t.ref.current.id || t.ref.current.className : null) : null
        })) : null
      };
    });
  })()`);

  console.log('Nav pills Fiber targets inspection:\n', JSON.stringify(fiberNav, null, 2));

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

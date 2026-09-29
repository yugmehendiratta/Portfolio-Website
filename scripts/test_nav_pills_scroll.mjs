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

  const getNavPillsState = () => {
    return evalCode(`(() => {
      const pills = Array.from(document.querySelectorAll('.framer-891Ch')).map(a => ({
        href: a.getAttribute('href'),
        className: a.className,
        isActive: a.className.includes('framer-v-1m3kj3m') && !a.className.includes('framer-v-2tyaa4'),
        bgColor: window.getComputedStyle(a).backgroundColor
      }));
      return {
        scrollY: window.scrollY,
        pills
      };
    })()`);
  };

  console.log('--- Initial Floating Nav Pills state (scrollY 0) ---');
  console.log(JSON.stringify(await getNavPillsState(), null, 2));

  // Scroll to 800 (My Story)
  await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 500, y: 500, deltaX: 0, deltaY: 800 });
  await new Promise(r => setTimeout(r, 800));
  console.log('--- After scroll to My Story (~800) ---');
  console.log(JSON.stringify(await getNavPillsState(), null, 2));

  // Scroll to 1800 (Work)
  await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 500, y: 500, deltaX: 0, deltaY: 1000 });
  await new Promise(r => setTimeout(r, 800));
  console.log('--- After scroll to Work (~1800) ---');
  console.log(JSON.stringify(await getNavPillsState(), null, 2));

  // Scroll to 3000 (Awards)
  await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 500, y: 500, deltaX: 0, deltaY: 1200 });
  await new Promise(r => setTimeout(r, 800));
  console.log('--- After scroll to Awards (~3000) ---');
  console.log(JSON.stringify(await getNavPillsState(), null, 2));

  // Scroll back to top
  await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 500, y: 500, deltaX: 0, deltaY: -3000 });
  await new Promise(r => setTimeout(r, 800));
  console.log('--- After scroll back to Top (0) ---');
  console.log(JSON.stringify(await getNavPillsState(), null, 2));

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

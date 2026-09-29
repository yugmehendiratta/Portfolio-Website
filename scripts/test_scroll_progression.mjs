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

  const log = [];
  // Scroll from 0 to 3600 in steps of 300px
  for (let y = 0; y <= 3600; y += 300) {
    await evalCode(`window.scrollTo(0, ${y}); window.dispatchEvent(new Event('scroll'));`);
    await new Promise(r => setTimeout(r, 100));

    const state = await evalCode(`(() => {
      const pills = Array.from(document.querySelectorAll('.framer-891Ch')).map(a => {
        const href = a.getAttribute('href');
        const isActive = a.className.includes('framer-v-1m3kj3m');
        return { href, isActive, className: a.className };
      });
      return { scrollY: window.scrollY, pills };
    })()`);
    log.push(state);
  }

  console.log('Scroll progression of pills:');
  log.forEach(entry => {
    const activeList = entry.pills.filter(p => p.isActive).map(p => p.href);
    console.log(`scrollY ${entry.scrollY}: active = [${activeList.join(', ')}]`);
  });

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

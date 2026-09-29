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

  // Check initial state of stickers, cursor tags, and floating navbar
  const initialInspect = await evalCode(`(() => {
    const stickers = Array.from(document.querySelectorAll('[data-framer-name*="Cursor Tag"], [data-framer-name*="Rectangle"], [data-framer-name*="Available"], [data-framer-name*="Sticker"]')).map(el => ({
      name: el.getAttribute('data-framer-name'),
      className: el.className,
      transform: window.getComputedStyle(el).transform,
      opacity: window.getComputedStyle(el).opacity,
      rect: {
        top: el.getBoundingClientRect().top,
        left: el.getBoundingClientRect().left,
        width: el.getBoundingClientRect().width,
        height: el.getBoundingClientRect().height
      }
    }));

    const navItems = Array.from(document.querySelectorAll('[data-framer-name="Floating Navbar"] a, [data-framer-name="Floating Navbar"] div, .framer-18dhp48 a')).map(el => ({
      text: el.innerText.trim(),
      className: el.className,
      name: el.getAttribute('data-framer-name')
    })).filter(x => x.text);

    return {
      stickersCount: stickers.length,
      stickers: stickers.slice(0, 8),
      navItems
    };
  })()`);

  console.log('=== INITIAL INSPECTION ===');
  console.log(JSON.stringify(initialInspect, null, 2));

  // Test Mouse Movement at various coordinates
  console.log('\n=== TESTING MOUSE MOVE ===');
  for (let x = 100; x <= 800; x += 150) {
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y: 300 });
    await new Promise(r => setTimeout(r, 100));
  }

  const afterMouseMove = await evalCode(`(() => {
    return Array.from(document.querySelectorAll('[data-framer-name*="Cursor Tag"], [data-framer-name*="Rectangle"]')).slice(0, 6).map(el => ({
      name: el.getAttribute('data-framer-name'),
      transform: window.getComputedStyle(el).transform,
      top: el.getBoundingClientRect().top,
      left: el.getBoundingClientRect().left
    }));
  })()`);
  console.log('Stickers after mouse move:\n', JSON.stringify(afterMouseMove, null, 2));

  // Test Scroll step by step
  console.log('\n=== TESTING SCROLL STEP BY STEP ===');
  const scrollSteps = [0, 400, 800, 1200, 1600, 2000, 2400, 0];
  for (const y of scrollSteps) {
    await evalCode(`window.scrollTo({ top: ${y}, behavior: 'instant' }); window.dispatchEvent(new Event('scroll'));`);
    await new Promise(r => setTimeout(r, 400));
    const navState = await evalCode(`(() => {
      const active = document.querySelector('[data-framer-name="Floating Navbar"] [data-framer-name*="Active"], [data-framer-name="Floating Navbar"] .framer-v-10gofpt, [data-framer-name="Floating Navbar"] .framer-v-12t281j');
      return {
        scrollY: window.scrollY,
        activePill: active ? active.innerText.trim() || active.getAttribute('data-framer-name') : 'none'
      };
    })()`);
    console.log(`Scroll pos ${y}:`, navState);
  }

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

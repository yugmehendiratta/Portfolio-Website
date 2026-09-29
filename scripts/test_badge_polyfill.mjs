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
  const consoleMessages = [];
  const jsExceptions = [];

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      consoleMessages.push({
        type: msg.params.type,
        args: msg.params.args.map(a => a.value || a.description || JSON.stringify(a))
      });
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      jsExceptions.push(msg.params.exceptionDetails);
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

  // Inject a script BEFORE page loads that creates the missing __framer-badge-container
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      document.addEventListener('DOMContentLoaded', () => {
        if (!document.getElementById('__framer-badge-container')) {
          const badge = document.createElement('div');
          badge.id = '__framer-badge-container';
          badge.style.display = 'none';
          document.body.appendChild(badge);
        }
      });
      // Also intercept getElementById for __framer-badge-container as immediate fallback
      const origGet = document.getElementById.bind(document);
      document.getElementById = function(id) {
        if (id === '__framer-badge-container') {
          let el = origGet(id);
          if (!el) {
            el = document.createElement('div');
            el.id = '__framer-badge-container';
            el.style.display = 'none';
            if (document.body) document.body.appendChild(el);
          }
          return el;
        }
        return origGet(id);
      };
    `
  });

  console.log('--- Navigating with badge container polyfill to https://yug-designsite.vercel.app/about ---');
  await send('Page.navigate', { url: 'https://yug-designsite.vercel.app/about' });
  await new Promise(r => setTimeout(r, 4000));

  const evalCode = async (expression) => {
    const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return res.result ? res.result.value : null;
  };

  console.log('\n=== EXCEPTIONS WITH BADGE CONTAINER FIXED ===');
  console.log('Exceptions count:', jsExceptions.length);
  jsExceptions.forEach(e => console.log(' ', e.exception ? e.exception.description : e.text));

  const fiberStats = await evalCode(`(() => {
    const all = Array.from(document.querySelectorAll('*'));
    const elementsWithFiber = all.filter(el => {
      return Object.keys(el).some(k => k.startsWith('__reactFiber') || k.startsWith('__reactProps'));
    });
    return {
      totalElements: all.length,
      elementsWithFiberCount: elementsWithFiber.length
    };
  })()`);
  console.log('Fiber stats:\n', fiberStats);

  // Test Scroll and Pill state
  console.log('\n=== TESTING SCROLL WITH BADGE CONTAINER FIXED ===');
  for (const y of [0, 800, 1800, 3000, 0]) {
    await evalCode(`window.scrollTo(0, ${y}); window.dispatchEvent(new Event('scroll'));`);
    await new Promise(r => setTimeout(r, 200));
    const active = await evalCode(`(() => {
      const pills = Array.from(document.querySelectorAll('.framer-891Ch')).map(a => ({
        href: a.getAttribute('href'),
        isActive: a.className.includes('framer-v-1m3kj3m')
      }));
      return { scrollY: window.scrollY, active: pills.filter(p => p.isActive).map(p => p.href) };
    })()`);
    console.log(`scrollY ${y}:`, active);
  }

  // Test Cursor Tag Repel
  console.log('\n=== TESTING CURSOR TAG REPEL ===');
  for (let x = 100; x <= 800; x += 150) {
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y: 300 });
    await new Promise(r => setTimeout(r, 100));
  }

  const cursorTagState = await evalCode(`(() => {
    return Array.from(document.querySelectorAll('[data-framer-name*="Cursor Tag"]')).map(el => ({
      name: el.getAttribute('data-framer-name'),
      transform: window.getComputedStyle(el).transform
    }));
  })()`);
  console.log('Cursor Tag transforms:\n', cursorTagState);

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

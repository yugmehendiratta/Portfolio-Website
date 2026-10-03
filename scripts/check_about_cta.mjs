import { spawn } from 'child_process';

const chromeProcess = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9229',
  '--no-first-run',
  '--disable-gpu',
  '--window-size=1440,900',
  'about:blank'
]);

setTimeout(async () => {
  try {
    const targets = await fetch('http://127.0.0.1:9229/json').then(r => r.json());
    const page = targets.find(t => t.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    let id = 1;
    const callbacks = new Map();
    ws.onmessage = e => {
      const m = JSON.parse(e.data);
      if (callbacks.has(m.id)) {
        callbacks.get(m.id)(m.result);
        callbacks.delete(m.id);
      }
    };
    const send = (method, params = {}) => new Promise(r => {
      const i = id++;
      callbacks.set(i, r);
      ws.send(JSON.stringify({ id: i, method, params }));
    });
    await new Promise(r => ws.onopen = r);
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.navigate', { url: 'http://localhost:3000/about' });
    await new Promise(r => setTimeout(r, 3000));

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const cta = document.querySelector(".framer-juqzm");
        const bodyHeight = document.body.scrollHeight;
        const main = document.querySelector("#main");
        const sections = Array.from(document.querySelectorAll("section, footer, nav, [data-framer-name]")).map(el => ({
          name: el.getAttribute('data-framer-name') || el.id || el.tagName,
          rect: el.getBoundingClientRect(),
          classes: el.className
        }));
        return {
          bodyHeight,
          mainRect: main ? main.getBoundingClientRect() : null,
          ctaExists: !!cta,
          ctaRect: cta ? cta.getBoundingClientRect() : null,
          ctaComputed: cta ? {
            display: getComputedStyle(cta).display,
            visibility: getComputedStyle(cta).visibility,
            opacity: getComputedStyle(cta).opacity,
            order: getComputedStyle(cta).order,
            position: getComputedStyle(cta).position
          } : null,
          sections
        };
      })()`,
      returnByValue: true
    });

    console.log('ABOUT CTA & LAYOUT INFO:\n', JSON.stringify(res.result.value, null, 2));
    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chromeProcess.kill();
    process.exit(0);
  }
}, 1500);

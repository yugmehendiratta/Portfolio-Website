import { spawn } from 'child_process';

const chromeProcess = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9230',
  '--no-first-run',
  '--disable-gpu',
  '--window-size=1440,900',
  'about:blank'
]);

setTimeout(async () => {
  try {
    const targets = await fetch('http://127.0.0.1:9230/json').then(r => r.json());
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
        const r = cta ? cta.getBoundingClientRect() : null;
        const main = document.querySelector("#main");
        const mr = main ? main.getBoundingClientRect() : null;
        
        const awards = document.querySelector("#awards");
        const ar = awards ? awards.getBoundingClientRect() : null;
        
        const mascot = cta ? cta.querySelector(".framer-asrmxz") : null;
        const mascotR = mascot ? mascot.getBoundingClientRect() : null;

        const heading = cta ? cta.querySelector(".framer-1fl8711") : null;
        const headingR = heading ? heading.getBoundingClientRect() : null;

        const comment = cta ? cta.querySelector(".framer-esbcc0") : null;
        const commentR = comment ? comment.getBoundingClientRect() : null;

        const banner = cta ? cta.querySelector(".framer-fbqfrp") : null;
        const bannerR = banner ? banner.getBoundingClientRect() : null;

        const windowH = window.innerHeight;
        const scrollH = document.documentElement.scrollHeight;

        return {
          windowH,
          scrollH,
          main: mr ? { top: mr.top, bottom: mr.bottom, height: mr.height } : null,
          awards: ar ? { top: ar.top, bottom: ar.bottom, height: ar.height } : null,
          cta: r ? { top: r.top, bottom: r.bottom, height: r.height, width: r.width } : null,
          mascot: mascotR ? { top: mascotR.top, height: mascotR.height, width: mascotR.width } : null,
          heading: headingR ? { top: headingR.top, height: headingR.height, text: heading.innerText } : null,
          comment: commentR ? { top: commentR.top, height: commentR.height } : null,
          banner: bannerR ? { top: bannerR.top, height: bannerR.height } : null
        };
      })()`,
      returnByValue: true
    });

    console.log('EXACT RECTS:\n', JSON.stringify(res.result.value, null, 2));
    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chromeProcess.kill();
    process.exit(0);
  }
}, 1500);

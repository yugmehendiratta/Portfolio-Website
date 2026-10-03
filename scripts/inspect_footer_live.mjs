import { spawn } from 'child_process';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspectFooter(url) {
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9233',
    '--no-first-run',
    '--disable-gpu',
    '--window-size=1440,900',
    'about:blank'
  ]);

  try {
    await new Promise(r => setTimeout(r, 1200));
    const targets = await fetch('http://127.0.0.1:9233/json').then(r => r.json());
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
    await send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, 3000));

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const footerRoot = document.querySelector('.framer-1a3b98z, .framer-1w4t669, [data-framer-name="Footer"]');
        if (!footerRoot) {
          return { error: 'No footer root found', bodyClasses: document.body.className };
        }
        
        function serialize(el, depth = 0) {
          if (depth > 6) return '...';
          const cs = window.getComputedStyle(el);
          return {
            tag: el.tagName,
            class: el.className,
            name: el.getAttribute('data-framer-name'),
            opacity: cs.opacity,
            visibility: cs.visibility,
            display: cs.display,
            width: cs.width,
            height: cs.height,
            bg: cs.backgroundImage || cs.backgroundColor,
            text: el.childNodes.length === 1 && el.childNodes[0].nodeType === 3 ? el.textContent.trim() : undefined,
            children: Array.from(el.children).map(c => serialize(c, depth + 1))
          };
        }

        return serialize(footerRoot);
      })()`,
      returnByValue: true
    });

    ws.close();
    return res.result.value;
  } finally {
    chromeProcess.kill();
  }
}

async function main() {
  const homeFooter = await inspectFooter('http://localhost:3000/');
  console.log('HOME FOOTER:', JSON.stringify(homeFooter, null, 2));

  const aboutFooter = await inspectFooter('http://localhost:3000/about');
  console.log('ABOUT FOOTER:', JSON.stringify(aboutFooter, null, 2));
}

main().catch(console.error);

import { spawn } from 'child_process';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const targets = await fetch('http://127.0.0.1:9223/json').then(r => r.json());
  const pageTarget = targets.find(t => t.type === 'page');
  if (!pageTarget) {
    console.error('No page target found');
    chromeProcess.kill();
    return;
  }

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
        text: msg.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' ')
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
  await send('DOM.enable');

  const evalCode = async (expression) => {
    const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return res.result ? res.result.value : null;
  };

  // 1. Inspect Home Page
  console.log('\n--- NAVIGATING TO HOME (http://localhost:3000/) ---');
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 3000));

  const homeImages = await evalCode(`(() => {
    return Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      currentSrc: img.currentSrc,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
      visible: img.offsetWidth > 0 && img.offsetHeight > 0,
      className: img.className,
      parentElement: img.parentElement ? img.parentElement.className : ''
    }));
  })()`);
  console.log('Home images count:', homeImages.length);
  homeImages.forEach(img => {
    console.log(`  - ${img.src} (alt: "${img.alt}", ${img.width}x${img.height}, visible: ${img.visible})`);
  });

  const homeScreenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scripts/home_screenshot.png', Buffer.from(homeScreenshot.data, 'base64'));
  console.log('Saved home_screenshot.png');

  // 2. Inspect About Page
  console.log('\n--- NAVIGATING TO ABOUT (http://localhost:3000/about) ---');
  consoleMessages.length = 0;
  jsExceptions.length = 0;
  await send('Page.navigate', { url: 'http://localhost:3000/about' });
  await new Promise(r => setTimeout(r, 4000));

  console.log('About console messages:', consoleMessages);
  console.log('About JS exceptions:', jsExceptions);

  const aboutImages = await evalCode(`(() => {
    return Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      currentSrc: img.currentSrc,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
      visible: img.offsetWidth > 0 && img.offsetHeight > 0
    }));
  })()`);
  console.log('About images count:', aboutImages.length);
  aboutImages.forEach(img => {
    console.log(`  - ${img.src} (alt: "${img.alt}", ${img.width}x${img.height})`);
  });

  const aboutScreenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scripts/about_screenshot.png', Buffer.from(aboutScreenshot.data, 'base64'));
  console.log('Saved about_screenshot.png');

  const aboutLayout = await evalCode(`(() => {
    const h1 = document.querySelector('h1, .framer-1a74d2q, .framer-1rjhpt7');
    const polaroid = document.querySelector('[data-framer-name*="Polaroid"], img[alt*="Yug"]');
    const nav = document.querySelector('nav, [data-framer-name="Floating Navbar"]');
    const button = document.querySelector('.framer-187vpa3');
    return {
      h1: h1 ? { text: h1.innerText, rect: h1.getBoundingClientRect() } : null,
      polaroid: polaroid ? { rect: polaroid.getBoundingClientRect() } : null,
      nav: nav ? { rect: nav.getBoundingClientRect() } : null,
      button: button ? { rect: button.getBoundingClientRect(), display: window.getComputedStyle(button).display } : null
    };
  })()`);
  console.log('About layout details:\n', JSON.stringify(aboutLayout, null, 2));

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

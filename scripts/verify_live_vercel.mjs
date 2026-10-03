import { spawn } from 'child_process';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const LIVE_BASE = 'https://yug-designsite.vercel.app';

const OLD_HASHES = [
  'tEtevi8JenLoBT4YdyPpWydOJg',
  'jaipCY5FvgftEDz3qtilGNnLVk',
  'O9xt0wGigYzX3kxKzDZ20639Y',
  'wxpAecGN18uH8LxIHrSmqj7J5s'
];

async function verifyLive() {
  console.log('====================================================');
  console.log('VERIFYING LIVE VERCEL DEPLOYMENT');
  console.log('====================================================\n');

  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9232',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  const targets = await fetch('http://127.0.0.1:9232/json').then(r => r.json());
  const pageTarget = targets.find(t => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (data.id && callbacks.has(data.id)) {
      callbacks.get(data.id)(data);
      callbacks.delete(data.id);
    }
  };

  const send = (method, params = {}) => new Promise((res, rej) => {
    const msgId = id++;
    callbacks.set(msgId, (d) => d.error ? rej(d.error) : res(d.result));
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await new Promise(r => ws.onopen = r);
  await send('Page.enable');
  await send('Runtime.enable');

  const routes = ['/', '/about', '/contact', '/play-ground', '/case-study'];

  for (const route of routes) {
    console.log(`\nChecking live URL: ${LIVE_BASE}${route}`);
    await send('Page.navigate', { url: `${LIVE_BASE}${route}` });
    await new Promise(r => setTimeout(r, 4500));

    const result = await send('Runtime.evaluate', {
      expression: `(() => {
        const imgs = Array.from(document.querySelectorAll('img')).map(i => ({
          src: i.src,
          currentSrc: i.currentSrc,
          w: i.naturalWidth,
          h: i.naturalHeight,
          visible: i.offsetWidth > 0 && i.offsetHeight > 0
        }));
        return {
          title: document.title,
          imgs
        };
      })()`,
      returnByValue: true
    });

    const data = result.result.value;
    const leaked = data.imgs.filter(img => OLD_HASHES.some(h => img.src.includes(h)));
    console.log(`  Page title: "${data.title}"`);
    console.log(`  Total images: ${data.imgs.length}`);
    console.log(`  Old template leaks: ${leaked.length === 0 ? '✅ 0 (Clean!)' : '❌ ' + leaked.length + ' found!'}`);
    if (leaked.length > 0) {
      leaked.forEach(l => console.log('    LEAK:', l.src));
    }

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`scripts/live_${route.replace(/\//g, '_')}.png`, Buffer.from(shot.data, 'base64'));
  }

  ws.close();
  chromeProcess.kill();
  console.log('\nLive verification complete!');
}

verifyLive().catch(console.error);

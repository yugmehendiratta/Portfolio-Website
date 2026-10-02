import { spawn } from 'child_process';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const routes = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
  { name: 'play-ground', path: '/play-ground' },
  { name: 'case-study', path: '/case-study' }
];

const OLD_HASHES = [
  'tEtevi8JenLoBT4YdyPpWydOJg',
  'jaipCY5FvgftEDz3qtilGNnLVk',
  'O9xt0wGigYzX3kxKzDZ20639Y',
  'wxpAecGN18uH8LxIHrSmqj7J5s'
];

async function runVerification() {
  console.log('====================================================');
  console.log('STARTING FULL PORTFOLIO VERIFICATION');
  console.log('====================================================\n');

  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9231',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  const targets = await fetch('http://127.0.0.1:9231/json').then(r => r.json());
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

  const report = {};

  for (const r of routes) {
    console.log(`\n--- Testing route: ${r.name} (${r.path}) ---`);
    await send('Page.navigate', { url: `http://localhost:3000${r.path}` });
    await new Promise(resolve => setTimeout(resolve, 3500));

    const images = await send('Runtime.evaluate', {
      expression: `(() => {
        return Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          currentSrc: img.currentSrc,
          alt: img.alt,
          w: img.naturalWidth,
          h: img.naturalHeight,
          visible: img.offsetWidth > 0 && img.offsetHeight > 0
        }));
      })()`,
      returnByValue: true
    });

    const imgList = images.result.value || [];
    const hasOldImage = imgList.some(img => OLD_HASHES.some(hash => img.src.includes(hash)));

    console.log(`  Images found: ${imgList.length}`);
    console.log(`  Old template image leak: ${hasOldImage ? '❌ FAILED' : '✅ PASSED (None)'}`);

    imgList.forEach(img => {
      if (img.src.includes('assets/img') || img.src.includes('framerusercontent')) {
        console.log(`    - ${img.src} (${img.w}x${img.h})`);
      }
    });

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`scripts/qa_${r.name}.png`, Buffer.from(shot.data, 'base64'));

    report[r.name] = {
      imageCount: imgList.length,
      hasOldImage,
      passed: !hasOldImage
    };
  }

  console.log('\n====================================================');
  console.log('VERIFICATION SUMMARY');
  console.log('====================================================');
  console.log(JSON.stringify(report, null, 2));

  ws.close();
  chromeProcess.kill();
}

runVerification().catch(console.error);

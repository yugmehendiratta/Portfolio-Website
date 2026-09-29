import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9236;
const TARGET_URL = 'http://localhost:3000/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function checkAnimations() {
  console.log(`Inspecting animations on ${TARGET_URL}...`);
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-anim-test-')
  ]);

  try {
    let wsUrl;
    for (let i = 0; i < 30; i++) {
      try {
        const res = await fetch(`http://localhost:${PORT}/json/version`);
        const json = await res.json();
        if (json.webSocketDebuggerUrl) { wsUrl = json.webSocketDebuggerUrl; break; }
      } catch (e) { await delay(200); }
    }

    const ws = new WebSocket(wsUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    const callbacks = new Map();
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id && callbacks.has(data.id)) {
        callbacks.get(data.id)(data);
        callbacks.delete(data.id);
      }
    };

    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, (res) => res.error ? reject(res.error) : resolve(res.result));
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

    const targetSend = (method, params = {}) => new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, (res) => res.error ? reject(res.error) : resolve(res.result));
      ws.send(JSON.stringify({ id: msgId, method, params, sessionId }));
    });

    await targetSend('Page.enable');
    await targetSend('Runtime.enable');
    await targetSend('Animation.enable');

    const detectedAnimations = [];
    ws.addEventListener('message', (msg) => {
      const d = JSON.parse(msg.data);
      if (d.method === 'Animation.animationStarted' || d.method === 'Animation.animationCreated') {
        detectedAnimations.push(d.params);
      }
    });

    await targetSend('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await targetSend('Page.navigate', { url: TARGET_URL });
    await delay(2000);

    // Check animated elements, transforms, loops, lenis, cursor tags, mascot, polaroid
    const initialAnimState = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        // 1. Cursor tags
        const cursorTags = Array.from(document.querySelectorAll('[data-framer-name="Cursor Tag"], [data-framer-name="Cursor"]')).map(el => ({
          name: el.getAttribute('data-framer-name'),
          styleTransform: el.style.transform,
          computedTransform: window.getComputedStyle(el).transform,
          hasChildren: el.children.length
        }));

        // 2. Polaroid
        const polaroid = document.querySelector('[data-framer-name="Polaroid"], [data-framer-name*="Polaroid"]');
        const polaroidData = polaroid ? {
          styleTransform: polaroid.style.transform,
          computedTransform: window.getComputedStyle(polaroid).transform,
          styleTransition: window.getComputedStyle(polaroid).transition
        } : null;

        // 3. Mascot
        const mascot = document.querySelector('.framer-1smnmk7');
        const mascotData = mascot ? {
          computedTransform: window.getComputedStyle(mascot).transform,
          hasContent: mascot.innerHTML.length > 0
        } : null;

        // 4. Lenis smooth scroll
        const lenisHtmlClass = document.documentElement.className;
        const hasLenis = typeof window.lenis !== 'undefined' || lenisHtmlClass.includes('lenis');

        // 5. Framer motion style elements
        const motionElements = Array.from(document.querySelectorAll('[style*="transform"], [style*="opacity"]')).map(el => ({
          tag: el.tagName,
          className: el.className,
          style: el.getAttribute('style')
        })).slice(0, 15);

        // 6. Check Web Animations API
        const webAnims = document.getAnimations().map(a => ({
          id: a.id,
          playState: a.playState,
          currentTime: a.currentTime,
          targetTag: a.effect?.target?.tagName,
          targetClass: a.effect?.target?.className
        }));

        return {
          cursorTags,
          polaroidData,
          mascotData,
          lenisHtmlClass,
          hasLenis,
          motionElementsCount: document.querySelectorAll('[style*="transform"]').length,
          motionElements,
          webAnimsCount: webAnims.length,
          webAnims
        };
      })()`,
      returnByValue: true
    });

    console.log('--- INITIAL ANIMATION STATE ---');
    console.log(JSON.stringify(initialAnimState.result.value, null, 2));

    // Scroll down and inspect
    console.log('\n--- SCROLLING DOWN ---');
    await targetSend('Runtime.evaluate', { expression: 'window.scrollTo({ top: 1500, behavior: "smooth" })' });
    await delay(1000);

    const scrolledAnimState = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        const storyCards = Array.from(document.querySelectorAll('#my-story .framer-6A3Mg')).map((c, i) => ({
          card: i + 1,
          styleTransform: c.style.transform,
          computedTransform: window.getComputedStyle(c).transform,
          computedOpacity: window.getComputedStyle(c).opacity
        }));

        const webAnims = document.getAnimations().map(a => ({
          id: a.id,
          playState: a.playState,
          currentTime: a.currentTime,
          targetTag: a.effect?.target?.tagName,
          targetClass: a.effect?.target?.className
        }));

        return {
          scrollY: window.scrollY,
          storyCards,
          webAnimsCount: webAnims.length,
          webAnims
        };
      })()`,
      returnByValue: true
    });

    console.log(JSON.stringify(scrolledAnimState.result.value, null, 2));

    // Hover test on polaroid and cards
    console.log('\n--- TESTING HOVER EVENTS ---');
    const hoverTest = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        const polaroid = document.querySelector('[data-framer-name="Default"], [data-framer-name*="Polaroid"]');
        if (polaroid) {
          const evt = new MouseEvent('mouseenter', { bubbles: true });
          polaroid.dispatchEvent(evt);
          return { dispatched: true, transform: window.getComputedStyle(polaroid).transform };
        }
        return { dispatched: false };
      })()`,
      returnByValue: true
    });
    console.log('Hover result:', hoverTest.result.value);

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

checkAnimations().catch(console.error);

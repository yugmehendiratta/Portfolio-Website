import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9240;
const TARGET_URL = 'http://localhost:3000/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function testAnimations() {
  console.log(`Starting Chrome CDP on ${TARGET_URL}...`);
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-anim-deep-')
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
    await targetSend('Console.enable');

    const consoleLogs = [];
    const errors = [];
    ws.addEventListener('message', (msg) => {
      const d = JSON.parse(msg.data);
      if (d.method === 'Runtime.consoleAPICalled') {
        consoleLogs.push({ type: d.params.type, args: d.params.args });
        if (d.params.type === 'error') errors.push(d.params);
      } else if (d.method === 'Runtime.exceptionThrown') {
        errors.push(d.params.exceptionDetails);
      }
    });

    await targetSend('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await targetSend('Page.navigate', { url: TARGET_URL });
    await delay(3000);

    // 1. Initial State Check
    const state0 = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        return {
          reactLoaded: typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined',
          lenisLoaded: typeof window.lenis !== 'undefined' || document.documentElement.className.includes('lenis'),
          bodyClass: document.body.className,
          htmlClass: document.documentElement.className,
          mainHydrated: document.getElementById('main')?.getAttribute('data-framer-hydrate-v2') !== null,
          animatedElements: Array.from(document.querySelectorAll('[data-framer-appear-id], [data-framer-component-type="Frame"], [style*="transform"]')).length,
          polaroid: (() => {
            const p = document.querySelector('[data-framer-name="Polaroid"], [data-framer-name*="Polaroid"]');
            if (!p) return null;
            const style = window.getComputedStyle(p);
            return {
              transform: style.transform,
              transition: style.transition,
              willChange: style.willChange,
              opacity: style.opacity
            };
          })(),
          cursorTag: (() => {
            const c = document.querySelector('[data-framer-name="Cursor Tag"], [data-framer-name*="Tag"]');
            if (!c) return null;
            const style = window.getComputedStyle(c);
            return {
              transform: style.transform,
              transition: style.transition,
              opacity: style.opacity
            };
          })(),
          navLinks: Array.from(document.querySelectorAll('.framer-14f7725 a, .framer-1a7337v, [data-framer-name="Navigation Bar"] a, nav a')).map(a => ({
            text: a.innerText.trim(),
            href: a.getAttribute('href'),
            classes: a.className,
            parentClasses: a.parentElement?.className
          }))
        };
      })()`,
      returnByValue: true
    });

    console.log('=== INITIAL LOAD STATE ===');
    console.log(JSON.stringify(state0.result.value, null, 2));

    // 2. Hover interaction test: Polaroid
    console.log('\n=== POLAROID HOVER TEST ===');
    const polaroidHover = await targetSend('Runtime.evaluate', {
      expression: `(async () => {
        const p = document.querySelector('[data-framer-name="Polaroid"], [data-framer-name*="Polaroid"]');
        if (!p) return { found: false };
        const before = window.getComputedStyle(p).transform;
        
        // Dispatch real mouseenter/mouseover
        p.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        p.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await new Promise(r => setTimeout(r, 400));
        const during = window.getComputedStyle(p).transform;
        
        p.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        p.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
        await new Promise(r => setTimeout(r, 400));
        const after = window.getComputedStyle(p).transform;
        
        return { found: true, before, during, after, changed: before !== during };
      })()`,
      awaitPromise: true,
      returnByValue: true
    });
    console.log(JSON.stringify(polaroidHover.result.value, null, 2));

    // 3. Hover interaction test: Story Cards
    console.log('\n=== STORY CARDS HOVER TEST ===');
    const cardHover = await targetSend('Runtime.evaluate', {
      expression: `(async () => {
        const cards = Array.from(document.querySelectorAll('#my-story .framer-6A3Mg, #my-story [data-framer-name*="Card"]'));
        const results = [];
        for (let i = 0; i < cards.length; i++) {
          const c = cards[i];
          const before = window.getComputedStyle(c).transform;
          c.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          c.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
          await new Promise(r => setTimeout(r, 300));
          const during = window.getComputedStyle(c).transform;
          c.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
          await new Promise(r => setTimeout(r, 300));
          const after = window.getComputedStyle(c).transform;
          results.push({ card: i + 1, before, during, after, changed: before !== during });
        }
        return results;
      })()`,
      awaitPromise: true,
      returnByValue: true
    });
    console.log(JSON.stringify(cardHover.result.value, null, 2));

    // 4. Scroll test: Scroll through sections and observe transforms / in-view animations
    console.log('\n=== SCROLL TEST (0 -> 1000 -> 2000 -> 3000 -> 0) ===');
    const scrollPositions = [1000, 2000, 3000, 0];
    for (const pos of scrollPositions) {
      await targetSend('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${pos}, behavior: 'instant' })`
      });
      await delay(600);
      const scrollState = await targetSend('Runtime.evaluate', {
        expression: `(() => {
          const activeNav = document.querySelector('.framer-1a7337v[data-framer-name*="Active"], .framer-14f7725 [data-active="true"]')?.innerText?.trim();
          const storyCardsTransforms = Array.from(document.querySelectorAll('#my-story .framer-6A3Mg')).map(c => window.getComputedStyle(c).transform);
          const workTransforms = Array.from(document.querySelectorAll('#work [style*="transform"]')).map(w => window.getComputedStyle(w).transform);
          return {
            scrollY: window.scrollY,
            activeNav,
            storyCardsTransforms,
            workTransformsCount: workTransforms.length
          };
        })()`,
        returnByValue: true
      });
      console.log(`Scroll pos ${pos}:`, JSON.stringify(scrollState.result.value));
    }

    // 5. Console errors summary
    console.log('\n=== CONSOLE LOGS & ERRORS ===');
    console.log('Total console events:', consoleLogs.length);
    console.log('Errors / Exceptions count:', errors.length);
    if (errors.length > 0) {
      console.log('Errors:', JSON.stringify(errors, null, 2));
    }

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

testAnimations().catch(console.error);

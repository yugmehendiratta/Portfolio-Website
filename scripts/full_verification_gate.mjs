import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9244;
const TARGET_URL = 'http://localhost:3000/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function runGate() {
  console.log('=== STARTING LOCAL BROWSER VERIFICATION GATE ===');
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-gate-')
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
    const consoleErrors = [];
    ws.addEventListener('message', (msg) => {
      const d = JSON.parse(msg.data);
      if (d.method === 'Runtime.consoleAPICalled') {
        const text = d.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' ');
        consoleLogs.push({ type: d.params.type, text });
        if (d.params.type === 'error') consoleErrors.push(text);
      } else if (d.method === 'Runtime.exceptionThrown') {
        consoleErrors.push(JSON.stringify(d.params.exceptionDetails));
      }
    });

    // ----------------------------------------------------
    // STEP 4: VISUAL RENDER GATE
    // ----------------------------------------------------
    console.log('\n--- GATE 4: VISUAL RENDER GATE (Desktop 1440x900) ---');
    await targetSend('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await targetSend('Page.navigate', { url: TARGET_URL });
    await delay(3000);

    const renderCheck = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        const vpW = window.innerWidth;
        const scrollW = document.documentElement.scrollWidth;
        const scrollH = document.documentElement.scrollHeight;

        const bio = document.querySelector('#mainbio');
        const story = document.querySelector('#my-story');
        const work = document.querySelector('#work');
        const awards = document.querySelector('#awards');
        const nav = document.querySelector('.framer-14f7725, [data-framer-name="Navigation Bar"]');
        const cta = document.querySelector('.framer-1smnmk7, a[href*="contact"]');

        const isVisible = (el) => {
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        };

        return {
          viewportWidth: vpW,
          scrollWidth: scrollW,
          hasHorizontalOverflow: scrollW > vpW,
          sections: {
            bio: { exists: !!bio, visible: isVisible(bio), textSnippet: bio?.innerText?.slice(0, 80)?.replace(/\\n/g, ' ') },
            story: { exists: !!story, visible: isVisible(story), textSnippet: story?.innerText?.slice(0, 80)?.replace(/\\n/g, ' ') },
            work: { exists: !!work, visible: isVisible(work), textSnippet: work?.innerText?.slice(0, 80)?.replace(/\\n/g, ' ') },
            awards: { exists: !!awards, visible: isVisible(awards), textSnippet: awards?.innerText?.slice(0, 80)?.replace(/\\n/g, ' ') },
            floatingNav: { exists: !!nav, visible: isVisible(nav) },
            contact: { exists: !!cta, visible: isVisible(cta) }
          }
        };
      })()`,
      returnByValue: true
    });

    console.log(JSON.stringify(renderCheck.result.value, null, 2));

    // ----------------------------------------------------
    // STEP 5: ANIMATION GATE
    // ----------------------------------------------------
    console.log('\n--- GATE 5: ANIMATION GATE & INTERACTIONS ---');

    // 1. Move mouse across the page & test Hover Force / Cursor Tags
    console.log('Testing Mouse Movement & Cursor Tags...');
    const cursorTest = await targetSend('Runtime.evaluate', {
      expression: `(async () => {
        const tag = document.querySelector('[data-framer-name="Cursor Tag"], [data-framer-name="Cursor"]');
        const before = tag ? window.getComputedStyle(tag).transform : 'not found';
        
        // Move mouse
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 400, clientY: 300, bubbles: true }));
        await new Promise(r => setTimeout(r, 200));
        const after = tag ? window.getComputedStyle(tag).transform : 'not found';
        
        return { tagFound: !!tag, before, after };
      })()`,
      awaitPromise: true,
      returnByValue: true
    });
    console.log('Cursor Tag Result:', cursorTest.result.value);

    // 2. Polaroid motion & hover behavior
    console.log('\nTesting Polaroid Hover Motion in Bio...');
    const polaroidTest = await targetSend('Runtime.evaluate', {
      expression: `(async () => {
        const polaroid = document.querySelector('[data-framer-name="Polaroid"], [data-framer-name*="Polaroid"]');
        if (!polaroid) return { found: false };
        const before = window.getComputedStyle(polaroid).transform;
        
        polaroid.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        polaroid.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await new Promise(r => setTimeout(r, 400));
        const during = window.getComputedStyle(polaroid).transform;
        
        polaroid.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        await new Promise(r => setTimeout(r, 400));
        const after = window.getComputedStyle(polaroid).transform;
        
        return {
          found: true,
          before,
          during,
          after,
          styleTransition: window.getComputedStyle(polaroid).transition
        };
      })()`,
      awaitPromise: true,
      returnByValue: true
    });
    console.log('Polaroid Result:', polaroidTest.result.value);

    // 3. Story Cards entrance & hover behavior
    console.log('\nTesting Story Cards Hover Behavior...');
    const storyTest = await targetSend('Runtime.evaluate', {
      expression: `(async () => {
        const cards = Array.from(document.querySelectorAll('#my-story .framer-6A3Mg, #my-story [data-framer-name*="Card"]'));
        const results = [];
        for (let i = 0; i < cards.length; i++) {
          const c = cards[i];
          const before = window.getComputedStyle(c).transform;
          c.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          await new Promise(r => setTimeout(r, 300));
          const during = window.getComputedStyle(c).transform;
          c.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
          await new Promise(r => setTimeout(r, 300));
          results.push({ card: i + 1, before, during });
        }
        return results;
      })()`,
      awaitPromise: true,
      returnByValue: true
    });
    console.log('Story Cards Result:', storyTest.result.value);

    // 4. Slowly scroll top to bottom and back upward
    console.log('\nTesting Scroll from Top to Bottom and back upward...');
    const scrollState = [];
    for (const targetY of [800, 1600, 2400, 3200, 1600, 0]) {
      await targetSend('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${targetY}, behavior: 'smooth' })`
      });
      await delay(800);
      const res = await targetSend('Runtime.evaluate', {
        expression: `(() => {
          return {
            scrollY: Math.round(window.scrollY),
            activeNav: document.querySelector('.framer-1a7337v[data-framer-name*="Active"], .framer-14f7725 [data-active="true"], nav a[data-framer-name="Active"]')?.innerText?.trim() || 'none'
          };
        })()`,
        returnByValue: true
      });
      scrollState.push(res.result.value);
    }
    console.log('Scroll progression:', scrollState);

    // 5. Click Navigation Links (BIO, STORY, WORK, AWARDS)
    console.log('\nTesting Navigation Clicks (BIO, STORY, WORK, AWARDS)...');
    const navClickResults = await targetSend('Runtime.evaluate', {
      expression: `(async () => {
        const results = [];
        const navItems = [
          { name: 'BIO', sel: '#mainbio', linkText: 'Bio' },
          { name: 'STORY', sel: '#my-story', linkText: 'Story' },
          { name: 'WORK', sel: '#work', linkText: 'Work' },
          { name: 'AWARDS', sel: '#awards', linkText: 'Awards' }
        ];

        for (const item of navItems) {
          const link = Array.from(document.querySelectorAll('a')).find(a => a.innerText.trim().toLowerCase() === item.linkText.toLowerCase() || a.href.includes(item.sel.replace('#', '')));
          const el = document.querySelector(item.sel);
          if (!link) {
            results.push({ item: item.name, linkFound: false });
            continue;
          }
          link.click();
          await new Promise(r => setTimeout(r, 900));
          const r = el ? el.getBoundingClientRect() : null;
          results.push({
            item: item.name,
            linkFound: true,
            scrollY: Math.round(window.scrollY),
            targetTop: r ? Math.round(r.top) : null,
            targetInView: r ? (r.top >= -200 && r.top <= window.innerHeight) : false
          });
        }
        return results;
      })()`,
      awaitPromise: true,
      returnByValue: true
    });
    console.log('Nav Click Results:', navClickResults.result.value);

    // ----------------------------------------------------
    // STEP 6: CONSOLE GATE
    // ----------------------------------------------------
    console.log('\n--- GATE 6: CONSOLE AUDIT ---');
    console.log(`Total console events logged: ${consoleLogs.length}`);
    console.log(`Errors / Uncaught Exceptions: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log('Console errors:', consoleErrors);
    }

    // Capture final screenshots
    const shot = await targetSend('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    fs.writeFileSync('verified_local_full_gate.png', Buffer.from(shot.data, 'base64'));
    console.log('\nSaved full gate screenshot to verified_local_full_gate.png');

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

runGate().catch(console.error);

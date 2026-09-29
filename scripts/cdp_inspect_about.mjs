import { spawn } from 'child_process';
import http from 'http';

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

  // Get debug target
  const targets = await fetch('http://127.0.0.1:9222/json').then(r => r.json());
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
  await send('CSS.enable');

  console.log('--- Navigating to https://yug-designsite.vercel.app/about ---');
  await send('Page.navigate', { url: 'https://yug-designsite.vercel.app/about' });
  await new Promise(r => setTimeout(r, 4000));

  const evalCode = async (expression) => {
    const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return res.result ? res.result.value : null;
  };

  console.log('\n=== CONSOLE MESSAGES & ERRORS ===');
  console.log('Console messages:', consoleMessages);
  console.log('JS Exceptions:', jsExceptions);

  console.log('\n=== ANIMATION STATE INSPECTION ===');
  const animDetails = await evalCode(`(() => {
    const results = {};
    
    // 1. Web Animations
    const anims = document.getAnimations();
    results.webAnimationsCount = anims.length;
    results.webAnimations = anims.map(a => ({
      playState: a.playState,
      currentTime: a.currentTime,
      effect: a.effect ? a.effect.target ? a.effect.target.className : null : null
    }));

    // 2. Check Floating Nav items
    const nav = document.querySelector('[data-framer-name="Floating Navbar"]') || document.querySelector('nav');
    results.navFound = !!nav;
    if (nav) {
      results.navPills = Array.from(nav.querySelectorAll('a, button, [data-framer-name]')).map(el => ({
        tag: el.tagName,
        name: el.getAttribute('data-framer-name'),
        text: el.innerText.trim(),
        className: el.className
      })).filter(x => x.text);
    }

    // 3. Check Polaroid
    const polaroid = document.querySelector('[data-framer-name*="Polaroid"], [data-framer-name*="Photo"], img[alt*="Yug"], .framer-1a74d2q, .framer-17v0r5g');
    results.polaroid = polaroid ? {
      className: polaroid.className,
      transform: window.getComputedStyle(polaroid).transform,
      transition: window.getComputedStyle(polaroid).transition
    } : null;

    // 4. Check Story Cards
    const storySection = document.querySelector('#story') || document.querySelector('[data-framer-name="Story"]');
    results.storyFound = !!storySection;

    // 5. Check Lenis / Smooth Scroll
    results.hasLenis = typeof window.lenis !== 'undefined' || !!document.querySelector('.lenis');

    // 6. Check Framer Motion runtime objects on window
    results.windowKeys = Object.keys(window).filter(k => k.toLowerCase().includes('framer') || k.toLowerCase().includes('motion'));

    return results;
  })()`);

  console.log('Page Animation Details:\n', JSON.stringify(animDetails, null, 2));

  // Test Hover on Nav, Polaroid, Story cards, Work items
  console.log('\n=== HOVER TESTS ===');
  const hoverTest = await evalCode(`(() => {
    const testElements = [
      { name: 'nav-story', el: Array.from(document.querySelectorAll('a, button')).find(a => a.innerText.includes('Story')) },
      { name: 'nav-work', el: Array.from(document.querySelectorAll('a, button')).find(a => a.innerText.includes('Work')) },
      { name: 'polaroid', el: document.querySelector('img[alt*="Yug"], [data-framer-name*="Polaroid"]') },
      { name: 'sticky-available', el: Array.from(document.querySelectorAll('div, span, p')).find(e => e.innerText.includes('Available for work')) },
      { name: 'work-item', el: Array.from(document.querySelectorAll('div, a')).find(e => e.innerText.includes('Arkanj Tech') || e.innerText.includes('Figma')) }
    ];

    return testElements.map(item => {
      if (!item.el) return { name: item.name, found: false };
      const before = {
        transform: window.getComputedStyle(item.el).transform,
        opacity: window.getComputedStyle(item.el).opacity,
        background: window.getComputedStyle(item.el).backgroundColor
      };
      
      // Dispatch hover
      item.el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      item.el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

      const after = {
        transform: window.getComputedStyle(item.el).transform,
        opacity: window.getComputedStyle(item.el).opacity,
        background: window.getComputedStyle(item.el).backgroundColor
      };

      return {
        name: item.name,
        found: true,
        tag: item.el.tagName,
        className: item.el.className,
        before,
        after,
        changed: JSON.stringify(before) !== JSON.stringify(after)
      };
    });
  })()`);
  console.log('Hover test results:\n', JSON.stringify(hoverTest, null, 2));

  // Test Scrolling & Nav active pill triggers
  console.log('\n=== SCROLL TESTS ===');
  const scrollTest = await evalCode(`(async () => {
    const sections = ['bio', 'story', 'work', 'awards', 'contact'];
    const scrollLog = [];

    const getActivePill = () => {
      const active = document.querySelector('[data-framer-name*="Active"], .framer-v-10gofpt, .framer-v-12t281j, nav .active, [data-framer-variant*="Active"]');
      return active ? active.innerText || active.getAttribute('data-framer-name') || active.className : 'none';
    };

    scrollLog.push({ pos: 0, active: getActivePill() });

    // Scroll to 600px (Story)
    window.scrollTo(0, 600);
    window.dispatchEvent(new Event('scroll'));
    await new Promise(r => setTimeout(r, 400));
    scrollLog.push({ pos: 600, active: getActivePill() });

    // Scroll to 1400px (Work)
    window.scrollTo(0, 1400);
    window.dispatchEvent(new Event('scroll'));
    await new Promise(r => setTimeout(r, 400));
    scrollLog.push({ pos: 1400, active: getActivePill() });

    // Scroll to 2200px (Awards)
    window.scrollTo(0, 2200);
    window.dispatchEvent(new Event('scroll'));
    await new Promise(r => setTimeout(r, 400));
    scrollLog.push({ pos: 2200, active: getActivePill() });

    // Scroll back to top
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event('scroll'));
    await new Promise(r => setTimeout(r, 400));
    scrollLog.push({ pos: 0, active: getActivePill() });

    return scrollLog;
  })()`);
  console.log('Scroll test results:\n', JSON.stringify(scrollTest, null, 2));

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

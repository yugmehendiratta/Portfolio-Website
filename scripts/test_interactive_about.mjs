import { spawn } from 'child_process';

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

  const targets = await fetch('http://127.0.0.1:9222/json').then(r => r.json());
  const pageTarget = targets.find(t => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
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

  await send('Page.navigate', { url: 'https://yug-designsite.vercel.app/about' });
  await new Promise(r => setTimeout(r, 4000));

  const evalCode = async (expression) => {
    const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return res.result ? res.result.value : null;
  };

  // 1. Check sections bounding rects
  const sections = await evalCode(`(() => {
    return ['bio', 'story', 'work', 'awards', 'contact'].map(id => {
      const el = document.getElementById(id) || document.querySelector('[data-framer-name="' + id + '"]') || document.querySelector('[data-framer-name="' + id.charAt(0).toUpperCase() + id.slice(1) + '"]');
      return {
        id,
        found: !!el,
        top: el ? el.getBoundingClientRect().top + window.scrollY : null
      };
    });
  })()`);
  console.log('Sections positions:\n', sections);

  // 2. Test scrolling to each section and checking active pill in Floating Nav
  console.log('\n--- SCROLLING AND TESTING FLOATING NAV PILL ---');
  const scrollPositions = [0, 800, 1600, 2400, 3200, 4000, 0];
  for (const targetY of scrollPositions) {
    const currentY = await evalCode('window.scrollY');
    const deltaY = targetY - currentY;
    await send('Input.dispatchMouseEvent', {
      type: 'mouseWheel',
      x: 500,
      y: 500,
      deltaX: 0,
      deltaY: deltaY
    });
    await new Promise(r => setTimeout(r, 600));

    const pillState = await evalCode(`(() => {
      const activePill = document.querySelector('[data-framer-name="Floating Navbar"] [data-framer-name*="Active"], [data-framer-name="Floating Navbar"] .framer-v-10gofpt, [data-framer-name="Floating Navbar"] .framer-v-12t281j');
      const allPills = Array.from(document.querySelectorAll('[data-framer-name="Floating Navbar"] a, [data-framer-name="Floating Navbar"] [data-framer-name]')).map(p => ({
        name: p.getAttribute('data-framer-name'),
        text: p.innerText.trim(),
        className: p.className
      })).filter(x => x.text);

      return {
        scrollY: window.scrollY,
        activePill: activePill ? activePill.innerText.trim() || activePill.getAttribute('data-framer-name') : 'none',
        allPills
      };
    })()`);
    console.log(`At scrollY ${pillState.scrollY}: active =`, pillState.activePill);
  }

  // 3. Test Work Accordion click / hover
  console.log('\n--- TESTING WORK TIMELINE ACCORDION CLICK ---');
  const accordionTest = await evalCode(`(() => {
    const workItems = Array.from(document.querySelectorAll('[data-framer-name="Work"] [data-framer-name*="Item"], [data-framer-name="Work"] .framer-10gofpt, [data-framer-name="Work"] .framer-12t281j, [data-framer-name*="Arkanj"]'));
    return {
      workItemsCount: workItems.length,
      items: workItems.map(w => ({
        text: w.innerText.slice(0, 40),
        className: w.className
      }))
    };
  })()`);
  console.log('Work accordion items:\n', JSON.stringify(accordionTest, null, 2));

  // 4. Test Hover over Polaroid
  console.log('\n--- TESTING POLAROID HOVER ---');
  const polaroidHover = await evalCode(`(() => {
    const polaroid = document.querySelector('img[alt*="Yug"], [data-framer-name*="Polaroid"], .framer-2vhojh');
    if (!polaroid) return { found: false };
    const before = {
      transform: window.getComputedStyle(polaroid).transform,
      filter: window.getComputedStyle(polaroid).filter
    };
    polaroid.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    polaroid.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    const after = {
      transform: window.getComputedStyle(polaroid).transform,
      filter: window.getComputedStyle(polaroid).filter
    };
    return { found: true, before, after, changed: JSON.stringify(before) !== JSON.stringify(after) };
  })()`);
  console.log('Polaroid hover result:\n', polaroidHover);

  ws.close();
  chromeProcess.kill();
}

run().catch(console.error);

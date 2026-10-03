import { spawn } from 'child_process';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9232',
    '--no-first-run',
    '--disable-gpu',
    '--window-size=1440,900',
    'about:blank'
  ]);

  try {
    await new Promise(r => setTimeout(r, 1200));
    const targets = await fetch('http://127.0.0.1:9232/json').then(r => r.json());
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
        const all = Array.from(document.querySelectorAll('*'));
        const resumeEl = all.find(el => el.textContent && el.textContent.includes('Download Resume'));
        const footerTalk = all.find(el => el.textContent && (el.textContent.includes("LET'S TALK") || el.textContent.includes("LET")));
        const commentEl = all.find(el => el.textContent && el.textContent.includes('Open to contract'));
        const footerCard = document.querySelector('.framer-1w4t669, .framer-1a3b98z, [data-framer-name="Footer"]');
        
        // Find section 2 elements and note texts
        const section2 = document.querySelector('section[data-framer-name="How I Approach My Work"], section.framer-1q34n9d');
        const notes = Array.from(document.querySelectorAll('.framer-13p3nrk, .framer-u6fwr5, .framer-1j4k69v, .framer-1xesv5c, [data-framer-name*="Arrow"], [data-framer-name*="Note"]')).map(el => ({
          className: el.className,
          text: el.textContent,
          rect: el.getBoundingClientRect(),
          overflow: window.getComputedStyle(el).overflow,
          whiteSpace: window.getComputedStyle(el).whiteSpace,
          parentClass: el.parentElement ? el.parentElement.className : null,
          parentOverflow: el.parentElement ? window.getComputedStyle(el.parentElement).overflow : null
        }));

        return {
          resume: resumeEl ? {
            tag: resumeEl.tagName,
            class: resumeEl.className,
            outer: resumeEl.outerHTML.slice(0, 300),
            parentClass: resumeEl.parentElement ? resumeEl.parentElement.className : null,
            grandParentClass: resumeEl.parentElement && resumeEl.parentElement.parentElement ? resumeEl.parentElement.parentElement.className : null
          } : null,
          footerTalk: footerTalk ? {
            tag: footerTalk.tagName,
            class: footerTalk.className,
            text: footerTalk.textContent.slice(0, 50),
            opacity: window.getComputedStyle(footerTalk).opacity,
            visibility: window.getComputedStyle(footerTalk).visibility,
            display: window.getComputedStyle(footerTalk).display
          } : null,
          comment: commentEl ? {
            tag: commentEl.tagName,
            class: commentEl.className,
            text: commentEl.textContent.slice(0, 50),
            display: window.getComputedStyle(commentEl).display,
            opacity: window.getComputedStyle(commentEl).opacity,
            visibility: window.getComputedStyle(commentEl).visibility
          } : null,
          notes
        };
      })()`,
      returnByValue: true
    });

    console.log('Inspection result:', JSON.stringify(res.result.value, null, 2));
    ws.close();
  } finally {
    chromeProcess.kill();
  }
}

main().catch(console.error);

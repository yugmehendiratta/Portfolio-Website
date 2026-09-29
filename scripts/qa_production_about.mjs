import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9226;
const TARGET_URL = 'https://yug-designsite.vercel.app/about';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function runQA() {
  console.log(`Starting Chrome to inspect ${TARGET_URL}...`);
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/chrome-qa-')
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
    await targetSend('Network.enable');

    const consoleMessages = [];
    const failedRequests = [];
    const allRequests = [];

    ws.addEventListener('message', (msg) => {
      const d = JSON.parse(msg.data);
      if (d.method === 'Runtime.consoleAPICalled') {
        consoleMessages.push({ type: 'console', level: d.params.type, args: d.params.args });
      } else if (d.method === 'Console.messageAdded') {
        consoleMessages.push({ type: 'messageAdded', level: d.params.message.level, text: d.params.message.text });
      } else if (d.method === 'Runtime.exceptionThrown') {
        consoleMessages.push({ type: 'exception', details: d.params.exceptionDetails });
      } else if (d.method === 'Network.responseReceived') {
        const resp = d.params.response;
        allRequests.push({ url: resp.url, status: resp.status, statusText: resp.statusText });
        if (resp.status >= 400) {
          failedRequests.push({ url: resp.url, status: resp.status, statusText: resp.statusText });
        }
      } else if (d.method === 'Network.loadingFailed') {
        failedRequests.push({ url: d.params.url, error: d.params.errorText });
      }
    });

    const viewports = [
      { name: '1440x900', width: 1440, height: 900, mobile: false },
      { name: '768x1024', width: 768, height: 1024, mobile: true },
      { name: '375x812', width: 375, height: 812, mobile: true }
    ];

    const qaResults = {};

    for (const vp of viewports) {
      console.log(`\nTesting viewport: ${vp.name}...`);
      await targetSend('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile
      });

      await targetSend('Page.navigate', { url: TARGET_URL });
      await delay(3500); // Allow full load & hydration & animation settling

      const pageAnalysis = await targetSend('Runtime.evaluate', {
        expression: `(() => {
          const vpW = window.innerWidth;
          const vpH = window.innerHeight;
          const scrollW = document.documentElement.scrollWidth;
          const scrollH = document.documentElement.scrollHeight;

          // Sections check
          const sectionSelectors = {
            bio: '#mainbio',
            story: '#my-story',
            work: '#work',
            awards: '#awards'
          };

          const sections = {};
          for (const [key, sel] of Object.entries(sectionSelectors)) {
            const el = document.querySelector(sel);
            if (!el) {
              sections[key] = { exists: false };
            } else {
              const r = el.getBoundingClientRect();
              sections[key] = {
                exists: true,
                left: Math.round(r.left),
                right: Math.round(r.right),
                top: Math.round(r.top + window.scrollY),
                width: Math.round(r.width),
                height: Math.round(r.height),
                isClippedLeft: r.left < 0,
                isClippedRight: r.right > vpW
              };
            }
          }

          // Story cards
          const storyCardEls = Array.from(document.querySelectorAll('#my-story .framer-6A3Mg, #my-story [data-framer-name*="Card"], #my-story [data-framer-name*="card"]'));
          const storyCards = storyCardEls.map((c, i) => {
            const r = c.getBoundingClientRect();
            return {
              index: i + 1,
              text: c.innerText.slice(0, 50).replace(/\\n/g, ' '),
              left: Math.round(r.left),
              right: Math.round(r.right),
              width: Math.round(r.width),
              height: Math.round(r.height),
              clipped: r.left < 0 || r.right > vpW
            };
          });

          // Work details
          const workEl = document.querySelector('#work');
          const workText = workEl ? workEl.innerText : '';

          // Awards details
          const awardsEl = document.querySelector('#awards');
          const awardsText = awardsEl ? awardsEl.innerText : '';

          // Nav details
          const navLinks = Array.from(document.querySelectorAll('a[href*="#"]')).map(a => ({
            text: a.innerText.trim(),
            href: a.getAttribute('href'),
            rect: (() => { const r = a.getBoundingClientRect(); return { left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) }; })()
          }));

          // Legacy content check across entire body text
          const bodyText = document.body.innerText;
          const legacyKeywords = [
            'BEJAMAN', 'Bejaman', 'Benjamin', 'Chicago, IL',
            'Meridian Health', 'Searchless AI', 'StyleBook',
            'Homestead', 'North Light'
          ];
          const legacyFound = legacyKeywords.filter(kw => bodyText.includes(kw));

          // External and action links check
          const allLinks = Array.from(document.querySelectorAll('a')).map(a => ({
            text: a.innerText.trim().replace(/\\n/g, ' '),
            href: a.href,
            target: a.target
          }));

          return {
            viewport: { width: vpW, height: vpH },
            scrollWidth: scrollW,
            scrollHeight: scrollH,
            hasHorizontalOverflow: scrollW > vpW,
            sections,
            storyCards,
            workDetails: {
              hasTimeline: workText.includes('Timeline'),
              hasArkanj: workText.includes('Arkanj Tech Solutions'),
              hasUXAnalyst: workText.includes('UX Analyst') || workText.includes('UX') || workText.includes('Analyst'),
              hasDates: workText.includes('APR 2026') || workText.includes('CURRENT') || workText.includes('2026'),
              fullSnippet: workText.slice(0, 300)
            },
            awardsDetails: {
              hasHeading: awardsText.includes('AWARDS') || awardsText.includes('ACHIEVEMENTS'),
              hasQuarter: awardsText.includes('Q2 2026'),
              hasEmployeeOfQuarter: awardsText.includes('EMPLOYEE OF THE QUARTER'),
              hasYug: awardsText.includes('Yug Mehendiratta'),
              hasLinkedIn: awardsText.includes('LinkedIn') || !!awardsEl?.querySelector('a[href*="linkedin"]'),
              hasCertificate: /certificate/i.test(awardsText),
              fullSnippet: awardsText.slice(0, 300)
            },
            navLinks,
            legacyFound,
            allLinksCount: allLinks.length,
            links: allLinks.filter(l => l.text.length > 0)
          };
        })()`,
        returnByValue: true
      });

      qaResults[vp.name] = pageAnalysis.result.value;

      // Capture screenshot
      const shot = await targetSend('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
      fs.writeFileSync(`qa_prod_${vp.name}.png`, Buffer.from(shot.data, 'base64'));
      console.log(`Saved screenshot: qa_prod_${vp.name}.png`);
    }

    // Interactive Nav Test on Desktop
    console.log('\nTesting Nav Link Clicks on Desktop (1440x900)...');
    await targetSend('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await targetSend('Page.navigate', { url: TARGET_URL });
    await delay(3000);

    const navClickResults = await targetSend('Runtime.evaluate', {
      expression: `(async () => {
        const results = [];
        const targets = ['#mainbio', '#my-story', '#work', '#awards'];
        
        for (const target of targets) {
          const id = target.replace('#', '');
          const link = Array.from(document.querySelectorAll('a')).find(a => a.href.includes('#' + id));
          const el = document.querySelector(target);
          
          if (!link) {
            results.push({ target, linkFound: false });
            continue;
          }
          
          link.click();
          await new Promise(r => setTimeout(r, 800));
          
          const rect = el ? el.getBoundingClientRect() : null;
          results.push({
            target,
            linkFound: true,
            linkHref: link.getAttribute('href'),
            targetTopRelativeToViewport: rect ? Math.round(rect.top) : null,
            targetInView: rect ? (rect.top >= -200 && rect.top <= window.innerHeight) : false,
            currentScrollY: window.scrollY
          });
        }
        return results;
      })()`,
      awaitPromise: true,
      returnByValue: true
    });

    qaResults.interactiveNav = navClickResults.result.value;

    // Contact button / CTA checks
    const contactCheck = await targetSend('Runtime.evaluate', {
      expression: `(() => {
        const contactLinks = Array.from(document.querySelectorAll('a[href*="contact"], a[href*="mailto"], a[href*="tel"]')).map(a => ({
          text: a.innerText.trim(),
          href: a.href
        }));
        const linkedinLinks = Array.from(document.querySelectorAll('a[href*="linkedin"]')).map(a => ({
          text: a.innerText.trim(),
          href: a.href,
          target: a.target
        }));
        return { contactLinks, linkedinLinks };
      })()`,
      returnByValue: true
    });
    qaResults.contactAndSocial = contactCheck.result.value;

    qaResults.technical = {
      consoleMessages,
      failedRequests,
      totalRequests: allRequests.length
    };

    fs.writeFileSync('qa_prod_report_data.json', JSON.stringify(qaResults, null, 2));
    console.log('\nQA raw data saved to qa_prod_report_data.json');
    console.log('Console Errors/Exceptions:', consoleMessages.filter(m => m.level === 'error' || m.type === 'exception'));
    console.log('Failed Requests:', failedRequests);

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

runQA().catch(console.error);

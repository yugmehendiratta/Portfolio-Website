import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

async function test() {
  const browser = await chromium.launch({ headless: true });
  
  const viewports = [
    { name: 'desktop_1440', width: 1440, height: 900 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'mobile_375', width: 375, height: 812 }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const screenshotPath = `screenshot_${vp.name}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const data = await page.evaluate(() => {
      const getInfo = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        return {
          selector,
          className: el.className,
          rect: { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height), left: Math.round(rect.left), right: Math.round(rect.right) },
          display: style.display,
          position: style.position,
          width: style.width,
          maxWidth: style.maxWidth,
          left: style.left,
          transform: style.transform
        };
      };

      return {
        nav: getInfo('.framer-1ukjnmv'),
        nav_list: getInfo('.framer-rmz83s'),
        heading: getInfo('.framer-1pltn3m'),
        content_col: getInfo('.framer-94tkti'),
        mainbio: getInfo('#mainbio'),
        mainbio_box: getInfo('#mainbio .framer-1y1mzru'),
        mystory: getInfo('#my-story'),
        mystory_box: getInfo('#my-story .framer-ixsok6'),
        work: getInfo('#work'),
        work_box: getInfo('#work .framer-1ql5gwc'),
        awards: getInfo('#awards'),
        awards_box: getInfo('#awards .framer-1ql5gwc'),
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth
      };
    });

    console.log(`=== VIEWPORT ${vp.name} (${vp.width}x${vp.height}) ===`);
    console.log(JSON.stringify(data, null, 2));
  }

  await browser.close();
}

test().catch(console.error);

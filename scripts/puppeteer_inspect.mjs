import puppeteer from 'puppeteer-core';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const viewports = [
    { name: 'desktop_1440', width: 1440, height: 900 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'mobile_375', width: 375, height: 812 }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    await page.screenshot({ path: `screenshot_${vp.name}.png`, fullPage: true });

    const data = await page.evaluate(() => {
      const getInfo = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        return {
          selector,
          rect: {
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            left: Math.round(rect.left),
            right: Math.round(rect.right)
          },
          display: style.display,
          width: style.width,
          maxWidth: style.maxWidth,
          left: style.left,
          transform: style.transform
        };
      };

      return {
        viewportWidth: window.innerWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        nav: getInfo('.framer-1ukjnmv'),
        nav_list: getInfo('.framer-rmz83s'),
        heading: getInfo('.framer-1pltn3m'),
        content_col: getInfo('.framer-94tkti'),
        list_content: getInfo('.framer-me803a'),
        mainbio: getInfo('#mainbio'),
        mainbio_box: getInfo('#mainbio .framer-1y1mzru'),
        mystory: getInfo('#my-story'),
        mystory_box: getInfo('#my-story .framer-ixsok6'),
        mystory_grid: getInfo('#my-story .framer-mpn7rf'),
        mystory_card1: getInfo('#my-story .framer-15xqkt6-container'),
        mystory_note1: getInfo('#my-story .framer-1mk7bzi'),
        work: getInfo('#work'),
        work_box: getInfo('#work .framer-1ql5gwc'),
        awards: getInfo('#awards'),
        awards_box: getInfo('#awards .framer-1ql5gwc')
      };
    });

    console.log(`=== VIEWPORT ${vp.name} (${vp.width}x${vp.height}) ===`);
    console.log(JSON.stringify(data, null, 2));
    await page.close();
  }

  await browser.close();
}

test().catch(console.error);

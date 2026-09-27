import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3002/about');
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const getInfo = (el) => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        id: el.id,
        className: el.className,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height, left: rect.left, right: rect.right },
        style: {
          display: style.display,
          position: style.position,
          flexDirection: style.flexDirection,
          alignItems: style.alignItems,
          justifyContent: style.justifyContent,
          width: style.width,
          maxWidth: style.maxWidth,
          transform: style.transform,
          margin: style.margin,
          padding: style.padding,
          left: style.left
        }
      };
    };

    return {
      mainbio: getInfo(document.querySelector('#mainbio')),
      mystory: getInfo(document.querySelector('#my-story')),
      mystory_child1: getInfo(document.querySelector('#my-story > div')),
      mystory_bio: getInfo(document.querySelector('#my-story .framer-ixsok6')),
      mystory_grid: getInfo(document.querySelector('#my-story .framer-mpn7rf')),
      mystory_card1: getInfo(document.querySelector('#my-story .framer-15xqkt6-container')),
      mystory_note1: getInfo(document.querySelector('#my-story .framer-1mk7bzi')),
      work: getInfo(document.querySelector('#work')),
      work_child1: getInfo(document.querySelector('#work > div')),
      awards: getInfo(document.querySelector('#awards')),
      awards_child1: getInfo(document.querySelector('#awards > div')),
      awards_content: getInfo(document.querySelector('#awards .framer-1ql5gwc')),
      awards_items: Array.from(document.querySelectorAll('#awards .framer-1ql5gwc *')).map(el => ({
        tag: el.tagName,
        text: el.textContent?.substring(0, 30),
        rect: el.getBoundingClientRect(),
        display: window.getComputedStyle(el).display,
        position: window.getComputedStyle(el).position
      }))
    };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
}

test().catch(console.error);

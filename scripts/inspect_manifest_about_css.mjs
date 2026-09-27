import fs from 'node:fs';

const manifest = JSON.parse(fs.readFileSync('src/manifest.json', 'utf8'));
const aboutPage = manifest.pages.find(p => p.route === '/about');

console.log('About page head length:', aboutPage.head.length);

// Extract style tags from aboutPage.head
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let i = 0;
while ((match = styleRegex.exec(aboutPage.head)) !== null) {
  i++;
  console.log(`\n=== Style tag ${i} ===`);
  const css = match[1];
  // check for framer-1q34n9d, framer-14jsokh, framer-o05pe9, framer-1hsbhf7, framer-me803a
  ['framer-1q34n9d', 'framer-14jsokh', 'framer-o05pe9', 'framer-1hsbhf7', 'framer-me803a', 'framer-94tkti', 'framer-1u3qm76'].forEach(cls => {
    let idx = 0;
    while ((idx = css.indexOf(cls, idx)) !== -1) {
      console.log(`Found ${cls} at ${idx}:`, css.slice(Math.max(0, idx - 20), Math.min(css.length, idx + 200)));
      idx += cls.length + 1;
    }
  });
}

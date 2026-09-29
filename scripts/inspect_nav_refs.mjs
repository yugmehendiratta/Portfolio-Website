import fs from 'node:fs';

const bundlePath = 'public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs';
const bundle = fs.readFileSync(bundlePath, 'utf8');

const match = bundle.match(/L=j\(`dkrKqQyE0`\),.*?z=j\(`OlJBi42Qf`\);/);
console.log('Refs & Section IDs matched:', match ? match[0] : 'not found');

const navMatch = bundle.match(/framer-rmz83s.*?data-framer-name.*?Nav Sticky.*?children:\[([\s\S]*?)\]\)\}\)\}\),c\(`div`,\{className:`framer-94tkti`/);
if (navMatch) {
  console.log('Nav children length:', navMatch[1].length);
  fs.writeFileSync('scripts/nav_bundle_snippet.txt', navMatch[1]);
}

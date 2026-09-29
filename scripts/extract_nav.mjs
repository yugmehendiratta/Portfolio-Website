import fs from 'node:fs';

const bundlePath = 'public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs';
const bundle = fs.readFileSync(bundlePath, 'utf8');

const navStart = bundle.indexOf('framer-rmz83s');
console.log('navStart:', navStart);
const headingStart = bundle.indexOf('framer-94tkti');
console.log('headingStart:', headingStart);

if (navStart !== -1 && headingStart !== -1) {
  const navSnippet = bundle.substring(navStart - 50, headingStart);
  console.log('Nav snippet:');
  console.log(navSnippet);
  fs.writeFileSync('scripts/nav_snippet.txt', navSnippet);
}

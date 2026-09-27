import fs from 'node:fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Find all CSS strings in bundle
const cssRegex = /`([^`]*\{[^`]*\}[^`]*)`/g;
let match;
let count = 0;
while ((match = cssRegex.exec(bundle)) !== null) {
  if (match[1].includes('.framer-') && match[1].includes('{')) {
    count++;
    console.log(`=== CSS BLOCK ${count} ===`);
    console.log(match[1]);
  }
}

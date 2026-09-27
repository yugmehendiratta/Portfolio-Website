import fs from 'node:fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

console.log('Bundle length:', bundle.length);

// Find main sections in bundle
const sections = ['Bio ', 'My Story', 'Work', 'Awards', 'Contain Nav sticky'];
for (const s of sections) {
  const idx = bundle.indexOf(s);
  console.log(`Section "${s}" found at index ${idx}`);
}

// Find css rules in bundle (look for backticks containing css)
const cssIdx = bundle.indexOf('/* Layout */');
if (cssIdx !== -1) {
  console.log('Found /* Layout */ at', cssIdx);
}

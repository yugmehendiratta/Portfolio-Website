import fs from 'node:fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Find all occurrences of "My Story" in bundle and print the component code
let idx = 0;
while ((idx = bundle.indexOf('My Story', idx)) !== -1) {
  console.log('=== MY STORY at', idx, '===');
  console.log(bundle.slice(Math.max(0, idx - 200), Math.min(bundle.length, idx + 1500)));
  idx += 8;
}

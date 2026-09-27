import fs from 'fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Let's find all occurrences of framer-me803a
let idx = 0;
while ((idx = bundle.indexOf('framer-me803a', idx)) !== -1) {
  console.log(`=== framer-me803a at index ${idx} ===`);
  console.log(bundle.substring(idx - 100, idx + 200));
  idx += 13;
}

import fs from 'node:fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Search for V= or V =
let idx = 0;
while ((idx = bundle.indexOf('CCL0FQB1w', idx)) !== -1) {
  console.log('CCL0FQB1w at', idx, 'context:', bundle.slice(Math.max(0, idx - 100), Math.min(bundle.length, idx + 200)));
  idx += 10;
}

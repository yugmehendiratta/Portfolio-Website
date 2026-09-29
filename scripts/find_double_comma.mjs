import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Check for ,,
let idx = 0;
while ((idx = code.indexOf(',,', idx)) !== -1) {
  console.log('Found ,, at', idx, ':', code.slice(Math.max(0, idx - 50), Math.min(code.length, idx + 50)));
  idx += 2;
}

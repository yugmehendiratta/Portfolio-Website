import fs from 'node:fs';

const buf = fs.readFileSync('scripts/original_bundle.mjs');
let orig = buf[0] === 0xff && buf[1] === 0xfe ? buf.toString('utf16le') : buf.toString('utf8');
if (orig.charCodeAt(0) === 0xFEFF) orig = orig.slice(1);
const curr = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

let firstDiff = -1;
for (let i = 0; i < Math.min(orig.length, curr.length); i++) {
  if (orig[i] !== curr[i]) {
    firstDiff = i;
    break;
  }
}

console.log('First diff index (after BOM stripped):', firstDiff);
if (firstDiff !== -1) {
  console.log('--- Orig around diff ---');
  console.log(orig.slice(Math.max(0, firstDiff - 100), firstDiff + 300));
  console.log('\n--- Curr around diff ---');
  console.log(curr.slice(Math.max(0, firstDiff - 100), firstDiff + 300));
}

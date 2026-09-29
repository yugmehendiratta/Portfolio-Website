import fs from 'node:fs';

const buf = fs.readFileSync('scripts/original_bundle.mjs');
let orig = buf[0] === 0xff && buf[1] === 0xfe ? buf.toString('utf16le') : buf.toString('utf8');
if (orig.charCodeAt(0) === 0xFEFF) orig = orig.slice(1);

const curr = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

console.log('--- In ORIG: Polaroid component definition & use ---');
for (const m of orig.matchAll(/Polaroid/g)) {
  console.log(orig.slice(Math.max(0, m.index - 50), m.index + 150));
}

console.log('\n--- In CURR: Polaroid component definition & use ---');
for (const m of curr.matchAll(/Polaroid/g)) {
  console.log(curr.slice(Math.max(0, m.index - 50), m.index + 150));
}

import fs from 'node:fs';

const buf = fs.readFileSync('scripts/original_bundle.mjs');
let orig = buf[0] === 0xff && buf[1] === 0xfe ? buf.toString('utf16le') : buf.toString('utf8');
if (orig.charCodeAt(0) === 0xFEFF) orig = orig.slice(1);

const curr = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

console.log('--- In ORIG ---');
console.log('Hover components in orig:');
for (const match of orig.matchAll(/animationDistance/g)) {
  console.log(orig.slice(Math.max(0, match.index - 50), match.index + 100));
}

console.log('\nArrow components in orig:');
for (const match of orig.matchAll(/"Arrow"/g)) {
  console.log(orig.slice(Math.max(0, match.index - 50), match.index + 100));
}

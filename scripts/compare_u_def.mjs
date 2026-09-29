import fs from 'node:fs';

const buf = fs.readFileSync('scripts/original_bundle.mjs');
let orig = buf[0] === 0xff && buf[1] === 0xfe ? buf.toString('utf16le') : buf.toString('utf8');
if (orig.charCodeAt(0) === 0xFEFF) orig = orig.slice(1);

const curr = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const origIdx = orig.indexOf('U=P(');
console.log('--- In ORIG: U=P(...) definition ---');
console.log(orig.slice(origIdx, origIdx + 200));
const origG = orig.indexOf('G=P(');
console.log('\n--- In ORIG: right before G=P(...) ---');
console.log(orig.slice(origG - 300, origG + 50));

const currIdx = curr.indexOf('U=P(');
console.log('\n--- In CURR: U=P(...) definition ---');
console.log(curr.slice(currIdx, currIdx + 200));
const currG = curr.indexOf('G=P(');
console.log('\n--- In CURR: right before G=P(...) ---');
console.log(curr.slice(currG - 300, currG + 50));

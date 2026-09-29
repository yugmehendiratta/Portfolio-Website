import fs from 'node:fs';

const buf = fs.readFileSync('scripts/original_bundle.mjs');
let orig = buf[0] === 0xff && buf[1] === 0xfe ? buf.toString('utf16le') : buf.toString('utf8');
if (orig.charCodeAt(0) === 0xFEFF) orig = orig.slice(1);

const startIdx = orig.indexOf('U=P(');
const slice = orig.slice(startIdx, startIdx + 5000);
const gIdx = slice.indexOf('G=P(');
console.log('Slice before G=P:');
console.log(slice.slice(gIdx - 300, gIdx));

import fs from 'node:fs';

const buf = fs.readFileSync('scripts/original_bundle.mjs');
let orig = buf[0] === 0xff && buf[1] === 0xfe ? buf.toString('utf16le') : buf.toString('utf8');
if (orig.charCodeAt(0) === 0xFEFF) orig = orig.slice(1);

const curr = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Let's find all component invocations in orig:
const origComponents = Array.from(orig.matchAll(/o\(([A-Za-z0-9_$]+),/g)).map(m => m[1]);
console.log('Component identifiers passed to o(...) in ORIG:');
console.log([...new Set(origComponents)]);

// Let's find all component invocations in curr:
const currComponents = Array.from(curr.matchAll(/o\(([A-Za-z0-9_$]+),/g)).map(m => m[1]);
console.log('\nComponent identifiers passed to o(...) in CURR:');
console.log([...new Set(currComponents)]);

import fs from 'node:fs';

const buf = fs.readFileSync('scripts/original_bundle.mjs');
const orig = buf[0] === 0xff && buf[1] === 0xfe ? buf.toString('utf16le') : buf.toString('utf8');
const curr = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

console.log('--- ORIG IMPORTS ---');
const origImports = orig.slice(0, orig.indexOf('let '));
console.log(origImports);

console.log('\n--- CURR IMPORTS ---');
const currImports = curr.slice(0, curr.indexOf('let '));
console.log(currImports);

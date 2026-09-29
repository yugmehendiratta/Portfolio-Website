import fs from 'node:fs';

const buf = fs.readFileSync('scripts/original_bundle.mjs');
let orig = buf[0] === 0xff && buf[1] === 0xfe ? buf.toString('utf16le') : buf.toString('utf8');
if (orig.charCodeAt(0) === 0xFEFF) orig = orig.slice(1);
const curr = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Let's check what component is the main page component in orig:
// In orig, default export is $, let's see how $ is defined.
const origExportMatch = orig.match(/let \$=([^;]+);/);
console.log('Orig default export definition snippet:');
console.log(origExportMatch ? origExportMatch[1].slice(0, 300) : 'Not found');

const currExportMatch = curr.match(/let \$=([^;]+);/);
console.log('\nCurr default export definition snippet:');
console.log(currExportMatch ? currExportMatch[1].slice(0, 300) : 'Not found');

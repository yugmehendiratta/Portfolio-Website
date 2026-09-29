import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const meIdx = code.indexOf('framer-me803a');
const overlayIdx = code.indexOf('id:`overlay`');

const slice = code.slice(meIdx - 50, overlayIdx + 50);
console.log('--- FROM ME803A TO OVERLAY ---');
console.log(slice);

import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const prefix = code.slice(0, code.indexOf('View LinkedIn Post`}),o(`span`,{children:`↗`})'));
const suffix = code.slice(code.indexOf('[`.framer-NrOiv.framer-12hy5k5'));

console.log('Prefix length:', prefix.length);
console.log('Suffix length:', suffix.length);

const afterOverlay = code.slice(code.indexOf('o(`div`,{id:`overlay`})'));
console.log('\nAfter overlay (first 400 chars):');
console.log(afterOverlay.slice(0, 400));

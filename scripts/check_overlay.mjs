import fs from 'node:fs';

const bundlePath = 'public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs';
const bundle = fs.readFileSync(bundlePath, 'utf8');

const overlayIdx = bundle.indexOf('overlay');
console.log('overlayIdx:', overlayIdx);
console.log('Snippet around overlay:');
console.log(bundle.substring(overlayIdx - 100, overlayIdx + 50));

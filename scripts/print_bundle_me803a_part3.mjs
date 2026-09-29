import fs from 'node:fs';

const bundlePath = 'public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs';
const bundle = fs.readFileSync(bundlePath, 'utf8');

const me803aIdx = bundle.indexOf('framer-me803a');
console.log(bundle.substring(me803aIdx + 8000, me803aIdx + 14000));

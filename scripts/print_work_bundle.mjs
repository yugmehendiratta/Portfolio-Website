import fs from 'node:fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const sWork = bundle.indexOf('"data-framer-name":`Work`');
console.log('=== WORK IN BUNDLE ===');
console.log(bundle.slice(sWork - 50, sWork + 4000));

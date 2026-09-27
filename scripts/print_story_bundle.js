import fs from 'fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const sStart = bundle.indexOf('"data-framer-name":`My Story`');
const sEnd = bundle.indexOf('"data-framer-name":`Work`');

console.log('--- STORY JSX IN BUNDLE ---');
console.log(bundle.substring(sStart, sEnd));

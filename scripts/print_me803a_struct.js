import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const pList = bundle.indexOf('framer-me803a');
const pEnd = bundle.indexOf('id:`overlay`', pList);

console.log('=== framer-me803a structure in bundle ===');
console.log(bundle.substring(pList, pEnd + 20));

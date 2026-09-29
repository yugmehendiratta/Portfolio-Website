import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const tktiIdx = code.indexOf('framer-94tkti');
console.log('1000 chars before framer-94tkti:');
console.log(code.slice(tktiIdx - 1000, tktiIdx + 50));

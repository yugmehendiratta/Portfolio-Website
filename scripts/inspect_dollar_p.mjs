import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const dollarIdx = code.lastIndexOf('$=P(');
console.log('$=P( in curr:');
console.log(code.slice(dollarIdx + 5000, dollarIdx + 7000));

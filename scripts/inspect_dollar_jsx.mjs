import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const dollarIdx = code.indexOf('$=P(i(function');
console.log('Dollar function definition:');
const returnIdx = code.indexOf('return', dollarIdx);
console.log(code.slice(returnIdx, returnIdx + 600));

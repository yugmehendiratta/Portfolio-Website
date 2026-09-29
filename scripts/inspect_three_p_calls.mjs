import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// 1. U
const uIdx = code.indexOf('U=P(');
const uEnd = code.indexOf('U.displayName');
console.log('--- 1. U arguments ---');
console.log(code.slice(uEnd - 200, uEnd));

// 2. G
const gIdx = code.indexOf('G=P(');
const gEnd = code.indexOf('G.displayName');
console.log('\n--- 2. G arguments ---');
console.log(code.slice(gEnd - 200, gEnd));

// 3. $
const dollarIdx = code.indexOf('$=P(');
const dollarEnd = code.indexOf('$.displayName');
console.log('\n--- 3. $ arguments ---');
console.log(code.slice(dollarEnd - 200, dollarEnd));

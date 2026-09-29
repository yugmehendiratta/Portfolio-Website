import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Let's trace from `className:\`framer-1q34n9d\`,"data-framer-name":\`Awards\`,id:\`awards\``
const awardsStart = code.indexOf('id:`awards`');
// Let's find the `c(` before id:`awards`
const cIdx = code.lastIndexOf('c(`div`,{', awardsStart);

const sectionCode = code.slice(cIdx, code.indexOf('o(`div`,{id:`overlay`})'));

console.log('--- AWARDS CODE ---');
console.log(sectionCode);

import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');
const awardsStart = code.indexOf('id:`awards`');
console.log('Awards start index:', awardsStart);

const awardsSnippet = code.slice(awardsStart - 50, awardsStart + 2500);
console.log('--- AWARDS CODE ---');
console.log(awardsSnippet);

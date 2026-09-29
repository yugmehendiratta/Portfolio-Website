import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const matches = Array.from(code.matchAll(/return [a-zA-Z0-9_$]+\(/g));
console.log('return func matches:');
matches.forEach(m => console.log(' at', m.index, code.slice(m.index, m.index + 80)));

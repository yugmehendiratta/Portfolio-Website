import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const meIdx = code.indexOf('framer-me803a');
const overlayIdx = code.indexOf('id:`overlay`');

// Let's find all open tags between meIdx and id:`awards`
const beforeAwards = code.slice(meIdx, code.indexOf('id:`awards`'));

console.log('--- Before Awards snippet from framer-me803a ---');
console.log(code.slice(meIdx - 30, meIdx + 250));

// Let's check after awards
const afterAwards = code.slice(code.indexOf('View LinkedIn Post'), overlayIdx + 50);
console.log('\n--- After Awards snippet ---');
console.log(afterAwards);

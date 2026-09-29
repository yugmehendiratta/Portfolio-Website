import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Find the component function definition
const compIdx = code.indexOf('framer-ABWci');
const overlayIdx = code.indexOf('id:`overlay`');

const startCode = code.slice(compIdx - 300, compIdx + 1000);
console.log('--- COMPONENT START ---');
console.log(startCode);

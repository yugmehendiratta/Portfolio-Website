import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Find all text effects / appear effects in bundle
const effectMatches = Array.from(code.matchAll(/effect:\{[^}]+\}/g));
console.log(`Found ${effectMatches.length} effects in bundle:`);
effectMatches.forEach(m => console.log(' ', m[0]));

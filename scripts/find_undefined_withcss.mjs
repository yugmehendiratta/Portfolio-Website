import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Find all P( calls in bundle
const pCalls = Array.from(code.matchAll(/P\(([^)]*)\)/g));
console.log(`Found ${pCalls.length} P() calls:`);
pCalls.forEach(p => console.log(' ', p[0].slice(0, 100)));

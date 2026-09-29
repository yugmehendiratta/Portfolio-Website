import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Find all `_(<something>,` or `a(<something>,`
const calls = Array.from(code.matchAll(/([_a])\(([^,()]+),/g)).map(m => m[2].trim());
console.log('Unique first arguments to _() or a():');
console.log([...new Set(calls)]);

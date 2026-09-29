import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const matches = Array.from(code.matchAll(/([A-Za-z0-9_$]+)\s*=\s*P\(/g));
console.log('Variables assigned by P():');
for (const m of matches) {
  const start = m.index;
  console.log(`\n=== Assignment: ${m[1]} ===`);
  console.log(code.slice(start, start + 300));
}

import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Find all `o([` or `a([` or `_([`
const arrayCalls = Array.from(code.matchAll(/([_ao])\(\s*\[/g));
console.log(`Found ${arrayCalls.length} calls passing array as first arg to jsx:`);
for (const m of arrayCalls) {
  console.log(code.slice(Math.max(0, m.index - 50), m.index + 100));
}

import fs from 'node:fs';

const framerCode = fs.readFileSync('public/assets/framer/framer.5HYnILGs.mjs', 'utf8');

// Find all `.split(` occurrences in framerCode
const splits = Array.from(framerCode.matchAll(/\.split\(/g)).map(m => m.index);
console.log(`Found ${splits.length} .split() occurrences in framer.`);

for (const s of splits) {
  console.log('\n--- SPLIT OCCURRENCE ---');
  console.log(framerCode.slice(Math.max(0, s - 80), s + 100));
}

import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Find all `P(` or `k(` calls
const withCssMatches = Array.from(code.matchAll(/(?:P|k)\(([^,]+),([^,)]+)/g));
console.log(`Found ${withCssMatches.length} withCSS calls:`);
withCssMatches.forEach((m, i) => {
  console.log(`[${i + 1}] Component: ${m[1].slice(0, 50)}, Styles arg: ${m[2].trim()}`);
});

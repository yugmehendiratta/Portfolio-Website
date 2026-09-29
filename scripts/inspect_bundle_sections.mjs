import fs from 'node:fs';

const bundlePath = 'public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs';
const bundle = fs.readFileSync(bundlePath, 'utf8');

console.log('Bundle length:', bundle.length);

// Search for section tags in bundle
const secRegex = /c\((?:'|")section(?:'|"),\s*\{[^}]*?\}/g;
let m;
while ((m = secRegex.exec(bundle)) !== null) {
  console.log('Found section in bundle:', m[0]);
}

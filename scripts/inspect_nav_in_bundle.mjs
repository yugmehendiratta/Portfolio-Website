import fs from 'node:fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const navIdx = bundle.indexOf('"Contain Nav sticky"');
console.log('=== NAV IN BUNDLE ===');
console.log(bundle.slice(navIdx - 100, navIdx + 3000));

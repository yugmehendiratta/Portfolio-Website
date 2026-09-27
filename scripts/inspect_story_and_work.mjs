import fs from 'node:fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Find Story section in bundle
const sIdx = bundle.indexOf('"My Story"');
console.log('=== STORY IN BUNDLE ===');
console.log(bundle.slice(sIdx - 100, sIdx + 4000));

// Find Work section in bundle
const wIdx = bundle.indexOf('"data-framer-name":`Work`');
console.log('=== WORK IN BUNDLE ===');
console.log(bundle.slice(wIdx - 100, wIdx + 3000));

// Find Awards section in bundle
const aIdx = bundle.indexOf('"data-framer-name": "Awards"');
console.log('=== AWARDS IN BUNDLE ===');
console.log(bundle.slice(aIdx - 100, aIdx + 3000));

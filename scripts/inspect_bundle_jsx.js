import fs from 'fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const sIdx = bundle.indexOf('framer-14jsokh');
console.log('--- framer-14jsokh ---');
console.log(bundle.substring(sIdx - 150, sIdx + 500));

const wIdx = bundle.indexOf('framer-o05pe9');
console.log('--- framer-o05pe9 ---');
console.log(bundle.substring(wIdx - 150, wIdx + 500));

const aIdx = bundle.indexOf('data-framer-name": "Awards"');
console.log('--- awards ---');
console.log(bundle.substring(aIdx - 150, aIdx + 500));

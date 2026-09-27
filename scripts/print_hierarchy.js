import fs from 'fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const sBio = bundle.indexOf('"data-framer-name":`Bio `');
console.log('=== BEFORE BIO (300 chars) ===');
console.log(bundle.substring(sBio - 300, sBio));

const sStory = bundle.indexOf('"data-framer-name":`My Story`');
console.log('=== BEFORE MY STORY (300 chars) ===');
console.log(bundle.substring(sStory - 300, sStory));

const sWork = bundle.indexOf('"data-framer-name":`Work`');
console.log('=== BEFORE WORK (300 chars) ===');
console.log(bundle.substring(sWork - 300, sWork));

const sAwards = bundle.indexOf('"data-framer-name": "Awards"');
console.log('=== BEFORE AWARDS (300 chars) ===');
console.log(bundle.substring(sAwards - 300, sAwards));

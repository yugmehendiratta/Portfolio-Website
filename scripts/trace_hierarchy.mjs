import fs from 'fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const listContentIdx = bundle.indexOf('data-framer-name":`List Content`');
const bioIdx = bundle.indexOf('data-framer-name":`Bio `');
const storyIdx = bundle.indexOf('data-framer-name":`My Story`');
const workIdx = bundle.indexOf('data-framer-name":`Work`');
const awardsIdx = bundle.indexOf('data-framer-name":`Awards`');

console.log({ listContentIdx, bioIdx, storyIdx, workIdx, awardsIdx });

console.log('--- Between Bio and Story ---');
console.log(bundle.substring(storyIdx - 150, storyIdx + 100));
console.log('--- Between Story and Work ---');
console.log(bundle.substring(workIdx - 150, workIdx + 100));
console.log('--- Between Work and Awards ---');
console.log(bundle.substring(awardsIdx - 150, awardsIdx + 100));
console.log('--- After Awards ---');
console.log(bundle.substring(awardsIdx + 2000, awardsIdx + 3000));

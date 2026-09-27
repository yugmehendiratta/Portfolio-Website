import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const sIdx = bundle.indexOf('data-framer-name":`My Story`');
if (sIdx !== -1) {
  console.log('Story JSX in bundle:');
  console.log(bundle.substring(sIdx, sIdx + 4000));
}

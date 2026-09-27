import fs from 'fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');
const idx = bundle.indexOf('Awards');
console.log(bundle.substring(idx - 100, idx + 2000));

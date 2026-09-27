import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const pFramer14 = bundle.indexOf('.framer-14jsokh');
console.log('pFramer14 at:', pFramer14);
console.log(bundle.substring(pFramer14 - 100, pFramer14 + 300));

import fs from 'fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const regex = /(?:L|fe|z)\s*=\s*j\([^)]+\)/g;
let m;
while ((m = regex.exec(bundle)) !== null) {
  console.log(m[0]);
}

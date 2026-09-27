import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

let pos = 0;
while ((pos = bundle.indexOf('function J(', pos)) !== -1 || (pos = bundle.indexOf('var J=', pos)) !== -1 || (pos = bundle.indexOf('const J=', pos)) !== -1) {
  console.log(bundle.substring(pos, pos + 200));
  pos += 10;
}

import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Find where V is defined
let pos = 0;
while ((pos = bundle.indexOf('function V(', pos)) !== -1 || (pos = bundle.indexOf('const V=', pos)) !== -1 || (pos = bundle.indexOf('var V=', pos)) !== -1) {
  console.log(bundle.substring(pos, pos + 300));
  pos += 10;
}

import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Find where V is defined or imported
let pos = 0;
while ((pos = bundle.indexOf('import ', pos)) !== -1) {
  const end = bundle.indexOf(';', pos);
  console.log(bundle.substring(pos, end + 1));
  pos = end + 1;
}

import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

let pos = 0;
while ((pos = bundle.indexOf('V=', pos)) !== -1) {
  console.log('Match at:', pos, bundle.substring(Math.max(0, pos - 20), pos + 80));
  pos += 2;
}

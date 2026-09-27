import fs from 'node:fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const cls = 'framer-1sbsau2';
let idx = 0;
while ((idx = bundle.indexOf('.' + cls, idx)) !== -1) {
  const end = bundle.indexOf('}', idx);
  console.log(bundle.slice(idx, end + 1).replace(/\n/g, ' '));
  idx += cls.length + 1;
}

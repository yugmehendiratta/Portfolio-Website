import fs from 'node:fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const classes = [
  'framer-10gofpt',
  'framer-13hmzbm',
  'framer-10vmn3d',
  'framer-17g34jv',
  'framer-1m7f4yp',
  'framer-n3c4-container'
];

for (const cls of classes) {
  let idx = 0;
  console.log(`\n=== Class: .${cls} ===`);
  while ((idx = bundle.indexOf('.' + cls, idx)) !== -1) {
    const end = bundle.indexOf('}', idx);
    console.log(bundle.slice(idx, end + 1).replace(/\n/g, ' '));
    idx += cls.length + 1;
  }
}

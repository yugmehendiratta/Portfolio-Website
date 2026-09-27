import fs from 'node:fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const classes = [
  'framer-mpn7rf',
  'framer-15xqkt6-container',
  'framer-705mjb-container',
  'framer-bml7qr-container',
  'framer-1pbq76w-container',
  'framer-1mk7bzi',
  'framer-rvqxqo',
  'framer-h7eo1w',
  'framer-li1ezw',
  'framer-ixsok6'
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

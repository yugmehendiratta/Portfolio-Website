import fs from 'node:fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const classes = [
  'framer-1hsbhf7',
  'framer-1u3qm76',
  'framer-1ukjnmv',
  'framer-qu7yco',
  'framer-rmz83s',
  'framer-94tkti',
  'framer-me803a',
  'framer-1q34n9d',
  'framer-1y1mzru',
  'framer-14jsokh',
  'framer-ixsok6',
  'framer-o05pe9',
  'framer-foyt4c',
  'framer-1ql5gwc',
  'framer-s9i670',
  'framer-1v06037'
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

import fs from 'fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const classNames = [
  'framer-1y1mzru',
  'framer-ixsok6',
  'framer-1ql5gwc',
  'framer-mpn7rf',
  'framer-10gofpt',
  'framer-1ukjnmv',
  'framer-qu7yco',
  'framer-rmz83s',
  'framer-1af8o5',
  'framer-2vhojh',
  'framer-6p0jh5',
  'framer-1no5cfb',
  'framer-15xqkt6-container',
  'framer-705mjb-container',
  'framer-bml7qr-container',
  'framer-1pbq76w-container',
  'framer-1mk7bzi',
  'framer-rvqxqo',
  'framer-h7eo1w',
  'framer-li1ezw'
];

for (const cls of classNames) {
  const regex = new RegExp(`\\.framer-[A-Za-z0-9_-]*\\s*\\.${cls}[^\\{]*\\{[^\\}]*\\}|\\.${cls}[^\\{]*\\{[^\\}]*\\}`, 'g');
  const matches = bundle.match(regex);
  console.log(`=== ${cls} ===`);
  if (matches) {
    matches.forEach(m => console.log('  ', m));
  }
}

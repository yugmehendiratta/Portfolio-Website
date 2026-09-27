import fs from 'fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const classNames = [
  'framer-1akwkpq',
  'framer-1hsbhf7',
  'framer-1u3qm76',
  'framer-1ukjnmv',
  'framer-qu7yco',
  'framer-rmz83s',
  'framer-94tkti',
  'framer-1pltn3m',
  'framer-n5931f',
  'framer-me803a',
  'framer-1q34n9d',
  'framer-13tnzw6',
  'framer-1m4k8ak',
  'framer-1y1mzru',
  'framer-14jsokh',
  'framer-foyt4c',
  'framer-eox33i',
  'framer-3cnw1y',
  'framer-nc06ra',
  'framer-71winf',
  'framer-ixsok6',
  'framer-mpn7rf',
  'framer-15xqkt6-container',
  'framer-705mjb-container',
  'framer-bml7qr-container',
  'framer-1pbq76w-container',
  'framer-1mk7bzi',
  'framer-rvqxqo',
  'framer-h7eo1w',
  'framer-li1ezw',
  'framer-o05pe9',
  'framer-1ql5gwc',
  'framer-6p0jh5',
  'framer-1no5cfb',
  'framer-10gofpt'
];

for (const cls of classNames) {
  const regex = new RegExp(`\\.framer-[A-Za-z0-9_-]*\\s*\\.${cls}[^\\{]*\\{[^\\}]*\\}|\\.${cls}[^\\{]*\\{[^\\}]*\\}`, 'g');
  const matches = bundle.match(regex);
  console.log(`=== ${cls} ===`);
  if (matches) {
    matches.forEach(m => console.log('  ', m));
  } else {
    console.log('   (no match)');
  }
}

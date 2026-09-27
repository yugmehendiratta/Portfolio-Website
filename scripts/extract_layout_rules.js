import fs from 'fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const classNames = [
  'framer-1akwkpq',
  'framer-1hsbhf7',
  'framer-1u3qm76',
  'framer-94tkti',
  'framer-me803a',
  'framer-1q34n9d',
  'framer-14jsokh',
  'framer-foyt4c',
  'framer-1h8izsz'
];

for (const cls of classNames) {
  const regex = new RegExp(`\\.framer-[A-Za-z0-9_-]*\\s*\\.${cls}[^\\{]*\\{[^\\}]*\\}|\\.${cls}[^\\{]*\\{[^\\}]*\\}`, 'g');
  const matches = bundle.match(regex);
  console.log(`=== ${cls} ===`);
  if (matches) {
    matches.forEach(m => console.log('  ', m));
  }
}

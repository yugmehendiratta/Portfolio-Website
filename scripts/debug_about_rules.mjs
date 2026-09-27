import fs from 'fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const tickRegex = /`([^`]+)`/g;
let match;
const rules = [];
while ((match = tickRegex.exec(bundle)) !== null) {
  if (match[1].includes('{') && match[1].includes('}')) {
    rules.push(match[1]);
  }
}

console.log(`Found ${rules.length} CSS rules with backticks.`);

const targets = [
  'framer-1u3qm76',
  'framer-1ukjnmv',
  'framer-94tkti',
  'framer-me803a',
  'framer-1q34n9d',
  'framer-14jsokh',
  'framer-o05pe9',
  'framer-1y1mzru',
  'framer-ixsok6',
  'framer-1ql5gwc',
  'framer-mpn7rf',
  'framer-10gofpt',
  'framer-foyt4c',
  'framer-rmz83s',
  'framer-15xqkt6-container',
  'framer-705mjb-container',
  'framer-bml7qr-container',
  'framer-1pbq76w-container'
];

targets.forEach(t => {
  console.log(`\n=== TARGET: ${t} ===`);
  rules.filter(r => r.includes(t)).forEach(r => console.log('  ', r));
});

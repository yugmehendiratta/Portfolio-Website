import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const navClasses = ['framer-1ukjnmv', 'framer-qu7yco', 'framer-rmz83s', 'framer-6rgt2z', 'framer-1pd4qj9', 'framer-1q98y8i'];

for (const cls of navClasses) {
  const regex = new RegExp(`\\.[a-zA-Z0-9_-]*${cls}[^{]*\\{[^}]*\\}`, 'g');
  const matches = code.match(regex) || [];
  console.log(`=== Matches for ${cls} ===`);
  matches.forEach(m => console.log(m));
}

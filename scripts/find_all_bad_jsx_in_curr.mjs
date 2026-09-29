import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const bad = ['yt', 'St', 'bt', 'xt', 'pt', 'mt', 'ht', 'gt', '_t', 'ft', 'Ze'];

for (const b of bad) {
  const matches = Array.from(code.matchAll(new RegExp(`([_ao])\\(\\s*${b}\\s*,`, 'g')));
  console.log(`Component [${b}] passed to jsx: ${matches.length} times`);
  matches.forEach(m => {
    console.log('  ', code.slice(Math.max(0, m.index - 50), m.index + 100));
  });
}

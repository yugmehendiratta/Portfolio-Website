import fs from 'node:fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const terms = ['14jsokh', 'o05pe9', 'ixsok6', 'mpn7rf', '1ql5gwc', '1h8izsz', 'foyt4c', '1q34n9d', '1y1mzru'];
for (const term of terms) {
  let idx = 0;
  console.log(`\n================= TERM: ${term} =================`);
  while ((idx = bundle.indexOf(term, idx)) !== -1) {
    console.log(bundle.slice(Math.max(0, idx - 40), Math.min(bundle.length, idx + 120)).replace(/\n/g, ' '));
    idx += term.length + 1;
  }
}

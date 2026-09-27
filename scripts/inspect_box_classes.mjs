import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

['framer-1y1mzru', 'framer-ixsok6', 'framer-1ql5gwc'].forEach(cls => {
  const regex = new RegExp(`\\.framer-[A-Za-z0-9_-]*\\s*\\.${cls}[^{]*\\{[^}]*\\}|\\.${cls}[^{]*\\{[^}]*\\}`, 'g');
  console.log('=== ' + cls + ' ===');
  const matches = bundle.match(regex);
  if (matches) matches.forEach(m => console.log('  ', m));
});

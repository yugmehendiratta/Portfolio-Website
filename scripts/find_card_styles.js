import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

['1sbsau2', '15xqkt6', 'mpn7rf', '1lnd6n7', 'fm2tup'].forEach(term => {
  let pos = 0;
  console.log(`=== Term: ${term} ===`);
  while ((pos = bundle.indexOf(term, pos)) !== -1) {
    console.log(bundle.substring(Math.max(0, pos - 40), Math.min(bundle.length, pos + 100)));
    pos += term.length;
  }
});

import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

['15xqkt6', '705mjb', 'bml7qr', '1pbq76w', '1mk7bzi', 'rvqxqo', 'h7eo1w', 'li1ezw', 'mpn7rf', 'ixsok6'].forEach(cls => {
  let pos = 0;
  while ((pos = bundle.indexOf(cls, pos)) !== -1) {
    console.log(`=== cls ${cls} at ${pos} ===`);
    console.log(bundle.substring(Math.max(0, pos - 100), Math.min(bundle.length, pos + 250)));
    pos += cls.length;
  }
});

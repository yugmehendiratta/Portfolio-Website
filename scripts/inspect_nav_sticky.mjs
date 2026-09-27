import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const sNav = bundle.indexOf('Nav Sticky');
if (sNav !== -1) {
  console.log('Nav Sticky JSX in bundle:');
  console.log(bundle.substring(sNav - 50, sNav + 4500));
}

import fs from 'node:fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const sV = bundle.indexOf('V=P(i(function(e,t){');
console.log('=== V COMPONENT ===');
console.log(bundle.slice(sV, sV + 3000));

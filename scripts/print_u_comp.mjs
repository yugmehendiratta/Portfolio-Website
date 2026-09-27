import fs from 'node:fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const sU = bundle.indexOf('U=P(i(function(e,t){');
console.log('=== U COMPONENT ===');
console.log(bundle.slice(sU, sU + 3000));

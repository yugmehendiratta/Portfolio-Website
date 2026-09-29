import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const returnIdx = code.indexOf('return k({}),o(E.Provider');
console.log('Return statement is inside what function?');
console.log(code.slice(returnIdx - 300, returnIdx + 100));

const cssIdx = code.indexOf('[`.framer-NrOiv.framer-12hy5k5');
console.log('\nFrom overlay to after CSS:');
console.log(code.slice(cssIdx - 50, cssIdx + 100));

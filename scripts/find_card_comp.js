import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

let pos = bundle.indexOf('CCL0FQB1w');
console.log('Match at:', pos);
console.log(bundle.substring(Math.max(0, pos - 200), pos + 200));

// Find the component identifier used for CCL0FQB1w
const compName = bundle.substring(pos - 10, pos);
console.log('compName context:', compName);

import fs from 'node:fs';

let code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

console.log('Before fix contains ,, count:', (code.match(/,,/g) || []).length);

code = code.replace(/,,/g, ',');

fs.writeFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', code, 'utf8');
console.log('After fix contains ,, count:', (code.match(/,,/g) || []).length);

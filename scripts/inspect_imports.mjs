import fs from 'fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');
const lines = bundle.split('\n').slice(0, 30);
console.log('Top lines:');
lines.forEach(l => {
  if (l.startsWith('import') || l.includes('from ')) {
    console.log(l.slice(0, 200));
  }
});

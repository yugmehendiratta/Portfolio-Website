import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

let pos = 0;
while (true) {
  let p1 = bundle.indexOf('"section"', pos);
  let p2 = bundle.indexOf('`section`', pos);
  if (p1 === -1 && p2 === -1) break;
  let p = (p1 !== -1 && p2 !== -1) ? Math.min(p1, p2) : (p1 !== -1 ? p1 : p2);
  console.log('Pos:', p, '->', bundle.substring(p - 10, p + 180));
  pos = p + 20;
}

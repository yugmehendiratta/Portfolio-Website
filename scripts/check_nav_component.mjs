import fs from 'node:fs';

const content = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

let p = 0;
while ((p = content.indexOf('mainbio', p)) !== -1) {
  console.log('--- Match at ' + p + ' ---');
  console.log(content.slice(Math.max(0, p - 150), p + 250));
  p += 'mainbio'.length;
}

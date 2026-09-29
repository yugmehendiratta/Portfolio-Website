import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const targets = ['AwardCursorTag', 'c4hrP4z7E', 'PRX6iqFU2', 'vbEcO5G8_', 'GxTqt3umO', 'iEy_P3Qu6', 'TSc14cjce'];

for (const t of targets) {
  let idx = 0;
  console.log(`\n=================== Target: ${t} ===================`);
  while ((idx = code.indexOf(t, idx)) !== -1) {
    console.log(code.slice(Math.max(0, idx - 100), idx + 100));
    idx += t.length;
  }
}

import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/react.73Opg4Pm.mjs', 'utf8');

const idx422 = code.indexOf('invariant=422');
console.log('422 index in react:', idx422);
if (idx422 !== -1) {
  console.log(code.slice(Math.max(0, idx422 - 300), idx422 + 400));
}

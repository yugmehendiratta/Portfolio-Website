import fs from 'node:fs';

const reactCode = fs.readFileSync('public/assets/framer/react.73Opg4Pm.mjs', 'utf8');

// Find error 130
const idx130 = reactCode.indexOf('invariant=130');
console.log('Error 130 in react.73Opg4Pm.mjs at index:', idx130);
if (idx130 !== -1) {
  console.log(reactCode.slice(Math.max(0, idx130 - 200), idx130 + 300));
}

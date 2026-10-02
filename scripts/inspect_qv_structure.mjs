import fs from 'fs';

const c = fs.readFileSync('public/assets/framer/script_main.B4-njmYi.mjs', 'utf8');
const l230 = c.split('\n')[230];
const target = '"data-layout-template":!0';
let idx = 0;
while ((idx = l230.indexOf(target, idx)) !== -1) {
  console.log('Match at', idx);
  console.log(l230.substring(idx - 50, idx + 800));
  console.log('---');
  idx += target.length;
}

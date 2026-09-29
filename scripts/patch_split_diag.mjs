import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/framer.5HYnILGs.mjs', 'utf8');
const target = 'function _g(e,t=`character`,n,r,i){';
const replacement = 'function _g(e,t=`character`,n,r,i){if(e==null||typeof e!=="string"){console.error("DIAG_SPLIT_NULL:", e, t); return e;}';

if (code.includes(target)) {
  const patched = code.replace(target, replacement);
  fs.writeFileSync('public/assets/framer/framer.5HYnILGs.mjs', patched);
  console.log('Patched _g in framer.5HYnILGs.mjs');
}

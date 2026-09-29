import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/react.73Opg4Pm.mjs', 'utf8');
if (!code.includes('DIAG_REACT_130')) {
  const target = 'throw Error(w(130,e==null?e:typeof e';
  const replacement = 'console.error("DIAG_REACT_130:", e, "PROPS:", JSON.stringify(n)); throw Error(w(130,e==null?e:typeof e';
  const patched = code.replace(target, replacement);
  fs.writeFileSync('public/assets/framer/react.73Opg4Pm.mjs', patched);
  console.log('Patched react.73Opg4Pm.mjs with diagnostics');
}

import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/react.73Opg4Pm.mjs', 'utf8');
const cleaned = code.replace('console.error("DIAG_REACT_130:", e, "PROPS:", JSON.stringify(n)); ', '');
fs.writeFileSync('public/assets/framer/react.73Opg4Pm.mjs', cleaned);
console.log('Restored react.73Opg4Pm.mjs to clean state');

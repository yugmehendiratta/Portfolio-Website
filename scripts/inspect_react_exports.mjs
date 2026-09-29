import fs from 'node:fs';

const reactCode = fs.readFileSync('public/assets/framer/react.73Opg4Pm.mjs', 'utf8');
console.log('React exports:');
console.log(reactCode.slice(reactCode.lastIndexOf('export')));

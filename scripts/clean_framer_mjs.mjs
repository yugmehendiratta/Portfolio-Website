import fs from 'node:fs';

const filePath = 'public/assets/framer/framer.5HYnILGs.mjs';
let code = fs.readFileSync(filePath, 'utf8');

// Replace any console.error diagnostic logs we added
code = code.replace(/console\.error\("DIAG_SPLIT_NULL:[^;]+;/g, '');
code = code.replace(/console\.error\("QB_UNDEFINED_STYLES:[^;]+;/g, '');

fs.writeFileSync(filePath, code, 'utf8');
console.log('Cleaned framer.5HYnILGs.mjs diagnostics');

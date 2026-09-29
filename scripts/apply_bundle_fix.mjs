import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

// 1. Read original backup
const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs.bak', 'utf8');

const targetStr = 'children:[o(`span`,{children:`View LinkedIn Post`}),o(`span`,{children:`↗`})';
const targetPos = code.indexOf(targetStr) + targetStr.length;
const cssIdx = code.indexOf('[`.framer-NrOiv.framer-12hy5k5');

if (targetPos === -1 || cssIdx === -1) {
  console.error('Target not found! targetPos:', targetPos, 'cssIdx:', cssIdx);
  process.exit(1);
}

// Exact closing string:
const exactClosing = ']})]})]})]})]})]})]})]})})]})' + ',o(`div`,{id:`overlay`})]})]})})},';
let fixedCode = code.slice(0, targetPos) + exactClosing + code.slice(cssIdx);
fixedCode = fixedCode.replace('`framer-NrOiv`),$.displayName', '`framer-NrOiv`)),$.displayName');

// 2. Write to bundle
fs.writeFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', fixedCode);
console.log('Successfully wrote fixed bundle.');

// 3. Validate with node --check
const res = spawnSync('node', ['--check', 'public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs'], { encoding: 'utf8' });
console.log('node --check exit code:', res.status);
if (res.status === 0) {
  console.log('node --check PASSED CLEANLY WITH ZERO ERRORS!');
} else {
  console.error('node --check STDERR:', res.stderr);
}

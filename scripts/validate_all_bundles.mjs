import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const dir = 'public/assets/framer';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mjs'));

console.log(`Checking syntax for ${files.length} .mjs files under ${dir}...`);

let failed = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  const res = spawnSync('node', ['--check', filePath], { encoding: 'utf8' });
  if (res.status !== 0) {
    console.error(`FAIL: ${file}`);
    console.error(res.stderr);
    failed++;
  } else {
    // console.log(`OK: ${file}`);
  }
}

if (failed === 0) {
  console.log(`\nALL ${files.length} .mjs FILES PASSED SYNTAX CHECK WITH ZERO ERRORS!`);
} else {
  console.error(`\n${failed} files failed syntax check!`);
  process.exit(1);
}

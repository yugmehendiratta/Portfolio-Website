import fs from 'node:fs';

const lines = fs.readFileSync('public/assets/framer/script_main.B4-njmYi.mjs', 'utf8').split('\n');
console.log('Total lines in script_main:', lines.length);
if (lines[238]) {
  console.log('Line 239 (first 1000 chars):');
  console.log(lines[238].slice(0, 1000));
  console.log('\nLine 239 around col 3781:');
  console.log(lines[238].slice(3500, 4100));
}

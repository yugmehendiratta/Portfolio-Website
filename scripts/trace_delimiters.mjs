import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Let's find from "#mainbio" or ".framer-me803a"
const startIdx = code.indexOf('framer-me803a');
const endIdx = code.indexOf('.framer-NrOiv.framer-12hy5k5');

console.log('Snippet length from framer-me803a to end of styles:', endIdx - startIdx);
const sub = code.slice(startIdx, endIdx + 50);

console.log('\n--- SUBSTRING ---');
console.log(sub.slice(-300));

// Let's trace delimiters: (, ), [, ], {, }
const stack = [];
const tokens = [];

for (let i = 0; i < sub.length; i++) {
  const ch = sub[i];
  if (ch === '(' || ch === '[' || ch === '{') {
    stack.push({ ch, i });
  } else if (ch === ')' || ch === ']' || ch === '}') {
    const expected = ch === ')' ? '(' : ch === ']' ? '[' : '{';
    const top = stack.pop();
    if (!top) {
      console.log(`UNMATCHED CLOSING DELIMITER '${ch}' at offset ${startIdx + i}`);
      console.log('Context:', sub.slice(Math.max(0, i - 40), i + 40));
    } else if (top.ch !== expected) {
      console.log(`MISMATCH: Expected '${expected}' for '${ch}', but got '${top.ch}' (opened at ${startIdx + top.i})`);
      console.log('Context opened:', sub.slice(Math.max(0, top.i - 20), top.i + 20));
      console.log('Context closed:', sub.slice(Math.max(0, i - 20), i + 20));
    }
  }
}

console.log('\nRemaining unclosed delimiters:', stack.length);
stack.forEach(s => console.log('Unclosed:', s.ch, 'at', startIdx + s.i, sub.slice(s.i, s.i + 40)));

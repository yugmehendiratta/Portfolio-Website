import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const startIdx = 18162;
const endIdx = code.indexOf('.framer-NrOiv.framer-12hy5k5');

const section = code.slice(startIdx, endIdx);

// Let's trace the JSX calls: c(tag, { ... children: [ ... ] }) or o(tag, { ... })
const stack = [];

for (let i = 0; i < section.length; i++) {
  const ch = section[i];
  if (ch === '(' || ch === '[' || ch === '{') {
    stack.push({ ch, pos: startIdx + i, context: section.slice(Math.max(0, i - 15), i + 25) });
  } else if (ch === ')' || ch === ']' || ch === '}') {
    const expected = ch === ')' ? '(' : ch === ']' ? '[' : '{';
    if (stack.length === 0) {
      console.log(`ERROR: Extra closing '${ch}' at pos ${startIdx + i}`);
      console.log('Context:', section.slice(Math.max(0, i - 30), i + 30));
    } else {
      const top = stack.pop();
      if (top.ch !== expected) {
        console.log(`MISMATCH at pos ${startIdx + i}: found '${ch}' (expected '${expected}' for '${top.ch}' from pos ${top.pos})`);
        console.log('Opened context:', top.context);
        console.log('Closed context:', section.slice(Math.max(0, i - 30), i + 30));
        break;
      }
    }
  }
}

console.log('Remaining unclosed at end of render JSX:', stack.length);
stack.forEach(s => console.log(' Unclosed:', s.ch, 'at', s.pos, 'context:', s.context));

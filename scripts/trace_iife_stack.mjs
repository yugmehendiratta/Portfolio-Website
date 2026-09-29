import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const targetStr = 'children:[o(`span`,{children:`View LinkedIn Post`}),o(`span`,{children:`↗`})';
const targetPos = code.indexOf(targetStr) + targetStr.length;
const cssIdx = code.indexOf('[`.framer-NrOiv.framer-12hy5k5');

const closing = ']})]})]})]})]})]})]})]})})]})' + ',o(`div`,{id:`overlay`})]})]})})' + '}';
const testCode = code.slice(0, targetPos) + closing + ',' + code.slice(cssIdx);

// Let's trace from offset 16660 to end of testCode
const iifeStart = testCode.indexOf('e((()=>{s()');
const iifeEnd = testCode.indexOf('export{Nt as __FramerMetadata__');

const iifeCode = testCode.slice(iifeStart, iifeEnd);

const stack = [];
for (let i = 0; i < iifeCode.length; i++) {
  const ch = iifeCode[i];
  if (ch === '(' || ch === '{' || ch === '[') {
    stack.push({ ch, pos: iifeStart + i, context: iifeCode.slice(Math.max(0, i - 15), i + 25) });
  } else if (ch === ')' || ch === '}' || ch === ']') {
    const expected = ch === ')' ? '(' : ch === '}' ? '{' : '[';
    if (stack.length === 0) {
      console.log(`EXTRA CLOSING '${ch}' at pos ${iifeStart + i}`);
      console.log('Context:', iifeCode.slice(Math.max(0, i - 30), i + 30));
    } else {
      const top = stack.pop();
      if (top.ch !== expected) {
        console.log(`MISMATCH at pos ${iifeStart + i}: found '${ch}' (expected '${expected}' for '${top.ch}' from pos ${top.pos})`);
        console.log('Top context:', top.context);
        console.log('Current context:', iifeCode.slice(Math.max(0, i - 30), i + 30));
        break;
      }
    }
  }
}

console.log('Remaining unclosed stack in IIFE:', stack.length);
stack.forEach(s => console.log(' Unclosed:', s.ch, 'at', s.pos, 'context:', s.context));

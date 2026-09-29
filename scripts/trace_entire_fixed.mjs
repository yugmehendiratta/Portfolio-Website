import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const targetStr = 'children:[o(`span`,{children:`View LinkedIn Post`}),o(`span`,{children:`↗`})';
const targetPos = code.indexOf(targetStr) + targetStr.length;
const cssIdx = code.indexOf('[`.framer-NrOiv.framer-12hy5k5');

const exactClosing = ']})]})]})]})]})]})]})]})})]})' + ',o(`div`,{id:`overlay`})]})]})})},';
const fixedCode = code.slice(0, targetPos) + exactClosing + code.slice(cssIdx);

// Check from $.displayName to end
const dispIdx = fixedCode.indexOf('$.displayName');
const endCode = fixedCode.slice(dispIdx);

console.log('Snippet from dispIdx:');
console.log(endCode.slice(0, 300));

const stack = [];
for (let i = 0; i < fixedCode.length; i++) {
  const ch = fixedCode[i];
  if (ch === '(' || ch === '{' || ch === '[') {
    stack.push({ ch, pos: i, context: fixedCode.slice(Math.max(0, i - 15), i + 25) });
  } else if (ch === ')' || ch === '}' || ch === ']') {
    const expected = ch === ')' ? '(' : ch === '}' ? '{' : '[';
    if (stack.length === 0) {
      console.log(`EXTRA CLOSING '${ch}' at pos ${i}`);
    } else {
      const top = stack.pop();
      if (top.ch !== expected) {
        console.log(`MISMATCH at pos ${i}: found '${ch}', expected '${expected}' for '${top.ch}' from pos ${top.pos}`);
        console.log('Top context:', top.context);
        console.log('Current context:', fixedCode.slice(Math.max(0, i - 20), i + 20));
        break;
      }
    }
  }
}

console.log('\nRemaining unclosed tokens in entire fixedCode:', stack.length);
stack.forEach(s => console.log(' Unclosed:', s.ch, 'at', s.pos, 'context:', s.context));

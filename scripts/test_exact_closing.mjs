import fs from 'node:fs';
import * as ts from 'typescript';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const targetStr = 'children:[o(`span`,{children:`View LinkedIn Post`}),o(`span`,{children:`↗`})';
const targetPos = code.indexOf(targetStr) + targetStr.length;
const cssIdx = code.indexOf('[`.framer-NrOiv.framer-12hy5k5');

// Sequence:
// 1. ]}) for a
// 2. ]}) for div (padding: 8px)
// 3. ]}) for div (framer-6p0jh5)
// 4. ]}) for div (framer-1ql5gwc)
// 5. ]}) for section (awards)
// 6. ]}) for div (framer-me803a)
// 7. ]}) for div (framer-94tkti)
// 8. ]}) for div (framer-1u3qm76)
// 9. })  for div (framer-1hsbhf7)
// 10. ]}) for div (framer-1akwkpq)
// 11. ,o(`div`,{id:`overlay`})
// 12. ]}) for te
// 13. })  for E.Provider

const exactClosing = ']})]})]})]})]})]})]})]})})]})' + ',o(`div`,{id:`overlay`})]})})';

console.log('Testing exact closing:\n', exactClosing);

const testCode = code.slice(0, targetPos) + exactClosing + ',' + code.slice(cssIdx);
const sf = ts.createSourceFile('test.mjs', testCode, ts.ScriptTarget.Latest, true);

console.log('\nParse diagnostics count:', sf.parseDiagnostics.length);
if (sf.parseDiagnostics.length > 0) {
  for (const d of sf.parseDiagnostics) {
    const { line, character } = sf.getLineAndCharacterOfPosition(d.start);
    console.log(`Line ${line + 1}, Col ${character + 1}: ${d.messageText}`);
    console.log('Snippet:', testCode.slice(Math.max(0, d.start - 40), d.start + 40));
  }
} else {
  console.log('\n ZERO DIAGNOSTICS! THE JS SYNTAX IS 100% VALID!');
}

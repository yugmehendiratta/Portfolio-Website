import fs from 'node:fs';
import * as ts from 'typescript';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');
const targetStr = 'children:[o(`span`,{children:`View LinkedIn Post`}),o(`span`,{children:`↗`})';
const targetPos = code.indexOf(targetStr) + targetStr.length;
const cssIdx = code.indexOf('[`.framer-NrOiv.framer-12hy5k5');

const closing = ']})]})]})]})]})]})]})]})})]})' + ',o(`div`,{id:`overlay`})]})]})})' + '}';
const testCode = code.slice(0, targetPos) + closing + ',' + code.slice(cssIdx);
const sf = ts.createSourceFile('test.mjs', testCode, ts.ScriptTarget.Latest, true);

console.log('Diagnostic count:', sf.parseDiagnostics.length);
for (const d of sf.parseDiagnostics) {
  const { line, character } = sf.getLineAndCharacterOfPosition(d.start);
  console.log(`Diagnostic: "${d.messageText}" at pos ${d.start} (line ${line + 1}, col ${character + 1})`);
  console.log('Snippet around diagnostic:\n', testCode.slice(Math.max(0, d.start - 80), d.start + 80));
}

import fs from 'node:fs';
import * as ts from 'typescript';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const targetStr = 'children:[o(`span`,{children:`View LinkedIn Post`}),o(`span`,{children:`↗`})';
const targetPos = code.indexOf(targetStr) + targetStr.length;
const cssIdx = code.indexOf('[`.framer-NrOiv.framer-12hy5k5');

const exactClosing = ']})]})]})]})]})]})]})]})})]})' + ',o(`div`,{id:`overlay`})]})]})})},';
let fixedCode = code.slice(0, targetPos) + exactClosing + code.slice(cssIdx);

// Also check closing after 'framer-NrOiv'
fixedCode = fixedCode.replace('`framer-NrOiv`),$.displayName', '`framer-NrOiv`)),$.displayName');

const sf = ts.createSourceFile('test_fixed.mjs', fixedCode, ts.ScriptTarget.Latest, true);

console.log('Fixed file parse diagnostics count:', sf.parseDiagnostics.length);
if (sf.parseDiagnostics.length === 0) {
  console.log('\n======================================================');
  console.log('🎉🎉🎉 ZERO DIAGNOSTICS! THE JS CODE IS 100% VALID! 🎉🎉🎉');
  console.log('======================================================');
} else {
  for (const d of sf.parseDiagnostics) {
    const { line, character } = sf.getLineAndCharacterOfPosition(d.start);
    console.log(`Diagnostic: "${d.messageText}" at pos ${d.start} (line ${line + 1}, col ${character + 1})`);
    console.log('Context:\n', fixedCode.slice(Math.max(0, d.start - 60), d.start + 60));
  }
}

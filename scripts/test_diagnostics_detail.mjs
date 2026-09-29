import fs from 'node:fs';
import * as ts from 'typescript';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const targetStr = 'children:[o(`span`,{children:`View LinkedIn Post`}),o(`span`,{children:`↗`})';
const targetPos = code.indexOf(targetStr) + targetStr.length;
const cssIdx = code.indexOf('[`.framer-NrOiv.framer-12hy5k5');

// Let's test different closing sequences and check the TypeScript parse result
const testClosing = (closing) => {
  const testCode = code.slice(0, targetPos) + closing + ',' + code.slice(cssIdx);
  const sf = ts.createSourceFile('test.mjs', testCode, ts.ScriptTarget.Latest, true);
  return { diagnostics: sf.parseDiagnostics, testCode };
};

// Let's test closings
const closings = [
  // Closing with function and component wrap
  ']})]})]})]})]})]})]})]})})]})' + ',o(`div`,{id:`overlay`})]})]})})' + '}',
  ']})]})]})]})]})]})]})]})})]})' + ',o(`div`,{id:`overlay`})]})]})})',
  ']})]})]})]})]})]})]})]})})]})' + ',o(`div`,{id:`overlay`})]})})})' + '})',
];

for (const c of closings) {
  const { diagnostics } = testClosing(c);
  console.log(`\nClosing: ${c}`);
  console.log('Diagnostics count:', diagnostics.length);
  for (const d of diagnostics.slice(0, 3)) {
    console.log(' -', d.messageText);
  }
}

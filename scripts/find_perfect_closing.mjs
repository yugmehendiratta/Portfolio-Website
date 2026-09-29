import fs from 'node:fs';
import * as ts from 'typescript';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const targetStr = 'children:[o(`span`,{children:`View LinkedIn Post`}),o(`span`,{children:`↗`})';
const targetIdx = code.indexOf(targetStr);
const afterTarget = targetIdx + targetStr.length;

// Let's find where the CSS array starts: [`.framer-NrOiv.framer-12hy5k5
const cssIdx = code.indexOf('[`.framer-NrOiv.framer-12hy5k5');

console.log('Current closing block in code:');
console.log(JSON.stringify(code.slice(afterTarget, cssIdx)));

// Let's test different closing candidate strings
// The candidate must close:
// 1. a tag
// 2. div (paddingTop: 8px)
// 3. div (Comment, framer-6p0jh5)
// 4. div (Content, framer-1ql5gwc)
// 5. section (Awards, framer-1q34n9d)
// 6. div (List Content, framer-me803a)
// 7. div (Content, framer-94tkti)
// 8. div (Contain, framer-1u3qm7q)
// 9. div (All content, framer-1akwkp1)
// 10. and then what?

// Let's test combinations
const candidates = [
  // 9 closures: a, div(8px), div(comment), div(content), section(awards), div(list content), div(content), div(contain), div(all content)
  ']})]})]})]})]})]})]})]})]})',
  ']})]})]})]})]})]})]})]})]}),o(`div`,{id:`overlay`})]})})})',
  ']})]})]})]})]})]})]})]})]}])})]})})}),o(`div`,{id:`overlay`})',
  ']})]})]})]})]})]})]})]})]})]})',
  ']})]})]})]})]})]})]})]})]})]})]})',
];

// Let's also do a systematic search for candidate strings
for (let n = 4; n <= 12; n++) {
  let closing = '';
  for (let k = 0; k < n; k++) closing += ']})';
  candidates.push(closing + ',o(`div`,{id:`overlay`})]})})})');
  candidates.push(closing + ']})})}),o(`div`,{id:`overlay`})');
  candidates.push(closing + ']})})})');
}

for (const cand of candidates) {
  const testCode = code.slice(0, afterTarget) + cand + ',' + code.slice(cssIdx);
  const sf = ts.createSourceFile('test.mjs', testCode, ts.ScriptTarget.Latest, true);
  if (sf.parseDiagnostics.length === 0) {
    console.log('\n SUCCESS! Found zero-diagnostic candidate:');
    console.log(cand);
    break;
  }
}

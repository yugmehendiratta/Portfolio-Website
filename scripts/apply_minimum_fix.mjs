import fs from 'node:fs';

const filePath = 'public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Replace o(yt, { animationDistance -> o(B, { animationDistance
const ytCountBefore = (code.match(/children:o\(yt,\{animationDistance:/g) || []).length;
code = code.replaceAll('children:o(yt,{animationDistance:', 'children:o(B,{animationDistance:');

// 2. Replace o(St, { AMQxizGuL -> o(U, { AMQxizGuL
const stCountBefore = (code.match(/children:o\(St,\{AMQxizGuL:/g) || []).length;
code = code.replaceAll('children:o(St,{AMQxizGuL:', 'children:o(U,{AMQxizGuL:');

// 3. Replace o(bt, { animated:!1, ... Arrow -> o(qe, { animated:!1, ... Arrow
const btCountBefore = (code.match(/o\(bt,\{animated:!1,className:`framer-fm2tup`/g) || []).length + (code.match(/o\(bt,\{animated:!1,className:`framer-1a3z98x`/g) || []).length;
code = code.replaceAll('o(bt,{animated:!1,className:`framer-fm2tup`', 'o(qe,{animated:!1,className:`framer-fm2tup`');
code = code.replaceAll('o(bt,{animated:!1,className:`framer-1a3z98x`', 'o(qe,{animated:!1,className:`framer-1a3z98x`');

// 4. Replace o(xt, { animated:!1, ... Arrow -> o(G, { animated:!1, ... Arrow
const xtCountBefore = (code.match(/o\(xt,\{animated:!1,className:`framer-1ugaiiq`/g) || []).length + (code.match(/o\(xt,\{animated:!1,className:`framer-1t5eghs`/g) || []).length;
code = code.replaceAll('o(xt,{animated:!1,className:`framer-1ugaiiq`', 'o(G,{animated:!1,className:`framer-1ugaiiq`');
code = code.replaceAll('o(xt,{animated:!1,className:`framer-1t5eghs`', 'o(G,{animated:!1,className:`framer-1t5eghs`');

fs.writeFileSync(filePath, code, 'utf8');

console.log(`Applied minimum fix:
- Replaced ${ytCountBefore} instances of o(yt) with o(B)
- Replaced ${stCountBefore} instances of o(St) with o(U)
- Replaced ${btCountBefore} instances of o(bt) with o(qe)
- Replaced ${xtCountBefore} instances of o(xt) with o(G)
`);

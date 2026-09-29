import fs from 'node:fs';
import path from 'node:path';

const dir = 'public/assets/framer';
const files = [
  'MffBJovlA.NNlD9paO.mjs',
  'JCTbwXFKE.QF_2SnXb.mjs',
  'ptQSvPZIk.Bxak4i6G.mjs',
  'TI_CAjGBM.C0XWEm_i.mjs',
  'Iep6i79Kc.Zkb4Blmv.mjs',
  'Iy0vxRObD.BVaNIVNR.mjs'
];

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  console.log(`\n=== ${file} ===`);
  const strings = Array.from(content.matchAll(/"([^"\\]{3,50})"/g)).map(m => m[1]);
  console.log('Strings:', strings.slice(0, 10));
}

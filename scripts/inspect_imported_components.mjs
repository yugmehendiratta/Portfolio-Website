import fs from 'node:fs';
import path from 'node:path';

const dir = 'public/assets/framer';
const files = [
  'MffBJovlA.NNlD9paO.mjs',
  'JCTbwXFKE.QF_2SnXb.mjs',
  'ptQSvPZIk.Bxak4i6G.mjs',
  'Lenis.KZnWqaM4.mjs',
  'qejcFG4ta.A3xqYfDU.mjs',
  'H8WdmyHet.CYsF8Rrm.mjs',
  'TI_CAjGBM.C0XWEm_i.mjs',
  'Iep6i79Kc.Zkb4Blmv.mjs',
  'Iy0vxRObD.BVaNIVNR.mjs',
  '792YM63vzES4DhZqa6FYuavrJpXgNJnP2bEI4rCzOJs.DUr9Nu2U.mjs'
];

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  console.log(`\n=== ${file} ===`);
  const meta = content.match(/__FramerMetadata__\s*=\s*({[^}]+})/);
  if (meta) console.log('Metadata:', meta[1]);
  const exportsLine = content.slice(content.lastIndexOf('export'));
  console.log('Exports:', exportsLine);
}

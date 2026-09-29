import fs from 'fs';

const files = [
  'MffBJovlA.NNlD9paO.mjs',
  'JCTbwXFKE.QF_2SnXb.mjs',
  'ptQSvPZIk.Bxak4i6G.mjs',
  'Lenis.KZnWqaM4.mjs',
  'qejcFG4ta.A3xqYfDU.mjs',
  'H8WdmyHet.CYsF8Rrm.mjs',
  'TI_CAjGBM.C0XWEm_i.mjs',
  'Iep6i79Kc.Zkb4Blmv.mjs',
  'Iy0vxRObD.BVaNIVNR.mjs'
];

for (const f of files) {
  const p = 'public/assets/framer/' + f;
  if (fs.existsSync(p)) {
    const text = fs.readFileSync(p, 'utf8');
    const names = [...text.matchAll(/data-framer-name[":`=]+([^"`]+)/g)].map(m => m[1]);
    const loops = [...text.matchAll(/__framer__loop/g)].length;
    const variants = [...text.matchAll(/variant/g)].length;
    console.log(f + ':');
    console.log('  names:', names.slice(0, 5));
    console.log('  loops:', loops, 'variants:', variants);
  }
}

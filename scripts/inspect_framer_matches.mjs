import fs from 'fs';

const files = [
  'public/assets/framer/0yBLd0PB0ip5Rzs9-QLcfoj4dY2kFE0yzHwiORtPyPw.Ca3Fwr26.mjs',
  'public/assets/framer/BtP3pvF_fYTo_Pg8rSB-HB_aaFqbK-TxzQyB0k7Exy4.BaGajfUT.mjs',
  'public/assets/framer/H8WdmyHet.CYsF8Rrm.mjs',
  'public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs',
  'public/assets/framer/fnj-content.mjs'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  console.log('\n========================================');
  console.log('=== ' + file + ' ===');
  console.log('========================================');
  const regex = /https:\/\/framerusercontent\.com\/images\/[^\s"'\`]+/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const start = Math.max(0, match.index - 60);
    const end = Math.min(content.length, match.index + match[0].length + 60);
    console.log('MATCH:', match[0]);
    console.log('CONTEXT:', content.slice(start, end).replace(/\n/g, ' '));
    console.log('---');
  }
});

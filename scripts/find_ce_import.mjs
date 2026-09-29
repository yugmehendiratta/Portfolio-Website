import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/BtP3pvF_fYTo_Pg8rSB-HB_aaFqbK-TxzQyB0k7Exy4.BaGajfUT.mjs', 'utf8');
const imports = code.match(/import\s*\{[^}]*\}\s*from\s*"[^"]*";/g) || [];
for (const im of imports) {
  if (im.includes('Ce')) console.log(im);
}

import fs from 'node:fs';

// Check all .mjs files for animation patterns
const files = fs.readdirSync('public/assets/framer').filter(f => f.endsWith('.mjs'));

console.log('--- ALL ANIMATION DEFINITIONS IN FRAMER ASSETS ---');
for (const file of files) {
  const content = fs.readFileSync('public/assets/framer/' + file, 'utf8');
  const animKeys = content.match(/__framer__[a-zA-Z0-9_$]+|whileHover|whileTap|whileInView|animate|variants|useAnimation|useScroll|useTransform/g);
  if (animKeys && animKeys.length > 0) {
    const unique = [...new Set(animKeys)];
    console.log(`File ${file}:`, unique);
  }
}

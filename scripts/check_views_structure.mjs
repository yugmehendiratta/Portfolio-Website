import fs from 'fs';

const files = fs.readdirSync('src/views');
files.forEach(f => {
  const c = fs.readFileSync('src/views/' + f, 'utf8');
  console.log('=== ' + f + ' ===');
  const hasOverlay = c.includes('id="overlay"');
  const hasTemplateOverlay = c.includes('id="template-overlay"');
  const has187vpa3 = c.includes('framer-187vpa3');
  console.log(`  overlay: ${hasOverlay}, template-overlay: ${hasTemplateOverlay}, framer-187vpa3: ${has187vpa3}`);
});

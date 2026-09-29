import fs from 'fs';

const pages = [
  'public/index.html',
  'public/about/index.html',
  'public/case-study/index.html',
  'public/play-ground/index.html',
  'public/contact/index.html'
];

for (const p of pages) {
  if (fs.existsSync(p)) {
    const html = fs.readFileSync(p, 'utf8');
    console.log(p + ':');
    console.log('  has __framer-badge-container:', html.includes('__framer-badge-container'));
    console.log('  has id="main":', html.includes('id="main"'));
    console.log('  has framerHydrateV2:', html.includes('framerHydrateV2'));
    console.log('  script tags:', (html.match(/<script[^>]*src=[^>]*>/g) || []).map(s => s.trim()));
  }
}

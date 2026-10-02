import fs from 'node:fs';

const manifest = JSON.parse(fs.readFileSync('src/manifest.json', 'utf8'));

manifest.pages.forEach(p => {
  console.log('----------------------------------------------------');
  console.log('Route:', p.route, 'File:', p.file);
  const title = (p.head.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = (p.head.match(/<meta\s+name="description"\s+content="([^"]*)"/) || [])[1];
  const ogTitle = (p.head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/) || [])[1];
  const ogDesc = (p.head.match(/<meta\s+property="og:description"\s+content="([^"]*)"/) || [])[1];
  const ogImg = (p.head.match(/<meta\s+property="og:image"\s+content="([^"]*)"/) || [])[1];
  const twTitle = (p.head.match(/<meta\s+name="twitter:title"\s+content="([^"]*)"/) || [])[1];
  const twDesc = (p.head.match(/<meta\s+name="twitter:description"\s+content="([^"]*)"/) || [])[1];
  const twImg = (p.head.match(/<meta\s+name="twitter:image"\s+content="([^"]*)"/) || [])[1];
  const canonical = (p.head.match(/<link\s+rel="canonical"\s+href="([^"]*)"/) || [])[1];

  console.log('Title:', title);
  console.log('Description:', desc);
  console.log('OG Title:', ogTitle);
  console.log('OG Desc:', ogDesc);
  console.log('OG Image:', ogImg);
  console.log('Canonical:', canonical);
});

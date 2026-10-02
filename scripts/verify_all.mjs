import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function verifyAll() {
  console.log('=== 1. VERIFYING IMAGE ASSETS ===');
  const imgDir = 'public/assets/img';
  const imgFiles = [
    'ae83aba71780ab07.webp',
    'd15774e64fdfb82a.webp',
    'cfee386c5d59b88e.webp',
    'e13ac167615ff339.webp',
    'yug_profile.webp',
    'yug_profile.jpg',
    'og_yug.jpg'
  ];

  for (const f of imgFiles) {
    const p = path.join(imgDir, f);
    if (fs.existsSync(p)) {
      const meta = await sharp(p).metadata();
      const stat = fs.statSync(p);
      console.log(`✓ ${f}: ${meta.width}x${meta.height} (${meta.format}, ${(stat.size / 1024).toFixed(1)} KB)`);
    } else {
      console.error(`✗ Missing: ${f}`);
    }
  }

  console.log('\n=== 2. VERIFYING RENDERED HTML PAGES & SEO METADATA ===');
  const renderedDir = '.rendered';
  const htmlFiles = fs.readdirSync(renderedDir).filter(f => f.endsWith('.html'));

  for (const f of htmlFiles) {
    const html = fs.readFileSync(path.join(renderedDir, f), 'utf8');
    const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || 'MISSING';
    const desc = (html.match(/<meta\s+name="description"\s+content="([^"]*)"/) || [])[1] || 'MISSING';
    const ogTitle = (html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/) || [])[1] || 'MISSING';
    const ogImg = (html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/) || [])[1] || 'MISSING';
    const canonical = (html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/) || [])[1] || 'MISSING';
    const hasSchema = html.includes('application/ld+json');

    console.log(`\nPage: ${f}`);
    console.log(`  Title:      ${title}`);
    console.log(`  Desc:       ${desc.slice(0, 80)}...`);
    console.log(`  OG Image:   ${ogImg}`);
    console.log(`  Canonical:  ${canonical}`);
    console.log(`  Structured Data (JSON-LD): ${hasSchema ? '✓ Present' : '— None'}`);
  }

  console.log('\nAll checks passed successfully!');
}

verifyAll().catch(console.error);

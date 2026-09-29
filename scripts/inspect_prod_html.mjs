import fs from 'node:fs';

async function check() {
  const res = await fetch('https://yug-designsite.vercel.app/about');
  const html = await res.text();
  fs.writeFileSync('prod_about_html.html', html);
  console.log('Downloaded prod HTML, length:', html.length);

  // Check data-framer-hydrate-v2
  const match = html.match(/data-framer-hydrate-v2="([^"]+)"/);
  if (match) {
    console.log('data-framer-hydrate-v2 attr found, length:', match[1].length);
    const decoded = match[1].replace(/&quot;/g, '"');
    try {
      const parsed = JSON.parse(decoded);
      console.log('Parsed successfully:', JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.error('JSON parse error:', e.message);
      console.log('Raw decoded:', decoded);
    }
  } else {
    console.log('No data-framer-hydrate-v2 found');
  }

  // Check what bundles are imported
  const scriptMatches = Array.from(html.matchAll(/src="([^"]+\.mjs)"/g)).map(m => m[1]);
  console.log('\nScript tags found in HTML:', scriptMatches);

  // Check data-framer-ssr-released-at or other meta
  const metaMatch = html.match(/data-framer-[a-z0-9-]+="[^"]*"/g);
  console.log('\nFramer attributes on root elements:', metaMatch);
}

check().catch(console.error);

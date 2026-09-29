import fs from 'node:fs';

const html = fs.readFileSync('.rendered/about.html', 'utf8');
const match = html.match(/data-framer-hydrate-v2="([^"]+)"/);
if (match) {
  const raw = match[1].replace(/&quot;/g, '"');
  console.log('Raw data-framer-hydrate-v2:', raw);
  try {
    const parsed = JSON.parse(raw);
    console.log('Successfully parsed data-framer-hydrate-v2:', parsed);
  } catch (e) {
    console.error('Failed to parse:', e.message);
  }
} else {
  console.log('data-framer-hydrate-v2 not found');
}

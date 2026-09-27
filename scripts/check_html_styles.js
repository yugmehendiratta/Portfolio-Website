import fs from 'fs';

const html = fs.readFileSync('.rendered/about.html', 'utf8');

// Extract all <style> tags
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let count = 0;
while ((match = styleRegex.exec(html)) !== null) {
  count++;
  const content = match[1];
  if (content.includes('framer-14jsokh') || content.includes('framer-1h8izsz') || content.includes('framer-foyt4c') || content.includes('framer-ixsok6')) {
    console.log(`=== Style tag ${count} contains matching rules ===`);
    const lines = content.split('}');
    for (const l of lines) {
      if (l.includes('14jsokh') || l.includes('1h8izsz') || l.includes('foyt4c') || l.includes('ixsok6') || l.includes('1q34n9d') || l.includes('o05pe9')) {
        console.log(l.trim() + '}');
      }
    }
  }
}

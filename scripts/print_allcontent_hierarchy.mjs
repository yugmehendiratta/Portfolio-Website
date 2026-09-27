import fs from 'node:fs';

const content = fs.readFileSync('src/sections/about/AllContent.tsx', 'utf8');

console.log('=== AllContent.tsx top-level hierarchy ===');
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('data-framer-name=') || line.includes('className=') || line.includes('id=')) {
    if (line.includes('Bio') || line.includes('Story') || line.includes('Work') || line.includes('Awards') || line.includes('Nav') || line.includes('Content') || line.includes('Contain')) {
      console.log(`L${i+1}: ${line.trim().slice(0, 120)}`);
    }
  }
}

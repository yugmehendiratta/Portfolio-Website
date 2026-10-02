import fs from 'fs';
import path from 'path';

const framerDir = 'public/assets/framer';
const files = fs.readdirSync(framerDir);

let totalReplacements = 0;

for (const file of files) {
  if (!file.endsWith('.mjs') && !file.endsWith('.js')) continue;
  const filePath = path.join(framerDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. tEtevi8JenLoBT4YdyPpWydOJg (Profile avatar / cursor head / 2026 polaroid)
  content = content.replaceAll(
    'https://framerusercontent.com/images/tEtevi8JenLoBT4YdyPpWydOJg.png?scale-down-to=512&width=870&height=869 512w,https://framerusercontent.com/images/tEtevi8JenLoBT4YdyPpWydOJg.png?width=870&height=869 870w',
    '/assets/img/d15774e64fdfb82a.webp 512w, /assets/img/ae83aba71780ab07.webp 870w'
  );
  content = content.replaceAll(
    'https://framerusercontent.com/images/tEtevi8JenLoBT4YdyPpWydOJg.png?scale-down-to=512&width=870&height=869',
    '/assets/img/d15774e64fdfb82a.webp'
  );
  content = content.replaceAll(
    'https://framerusercontent.com/images/tEtevi8JenLoBT4YdyPpWydOJg.png?width=870&height=869',
    '/assets/img/ae83aba71780ab07.webp'
  );
  content = content.replaceAll(
    'https://framerusercontent.com/images/tEtevi8JenLoBT4YdyPpWydOJg.png',
    '/assets/img/ae83aba71780ab07.webp'
  );

  // 2. jaipCY5FvgftEDz3qtilGNnLVk (Workspace / Santorini tall polaroid)
  content = content.replaceAll(
    'https://framerusercontent.com/images/jaipCY5FvgftEDz3qtilGNnLVk.png?width=683&height=1024 683w',
    '/assets/img/2df96adc70b14976.webp 683w'
  );
  content = content.replaceAll(
    'https://framerusercontent.com/images/jaipCY5FvgftEDz3qtilGNnLVk.png?width=683&height=1024',
    '/assets/img/2df96adc70b14976.webp'
  );
  content = content.replaceAll(
    'https://framerusercontent.com/images/jaipCY5FvgftEDz3qtilGNnLVk.png',
    '/assets/img/2df96adc70b14976.webp'
  );

  // 3. O9xt0wGigYzX3kxKzDZ20639Y (HeroAbout kinetic text image)
  content = content.replaceAll(
    'https://framerusercontent.com/images/O9xt0wGigYzX3kxKzDZ20639Y.jpg?width=870&height=869',
    '/assets/img/ae83aba71780ab07.webp'
  );
  content = content.replaceAll(
    'https://framerusercontent.com/images/O9xt0wGigYzX3kxKzDZ20639Y.jpg',
    '/assets/img/ae83aba71780ab07.webp'
  );

  // 4. wxpAecGN18uH8LxIHrSmqj7J5s (Contact / Polaroid)
  content = content.replaceAll(
    'https://framerusercontent.com/images/wxpAecGN18uH8LxIHrSmqj7J5s.png?scale-down-to=512&width=938&height=898 512w,https://framerusercontent.com/images/wxpAecGN18uH8LxIHrSmqj7J5s.png?width=938&height=898 938w',
    '/assets/img/e13ac167615ff339.webp 512w, /assets/img/cfee386c5d59b88e.webp 938w'
  );
  content = content.replaceAll(
    'https://framerusercontent.com/images/wxpAecGN18uH8LxIHrSmqj7J5s.png?scale-down-to=512&width=938&height=898',
    '/assets/img/e13ac167615ff339.webp'
  );
  content = content.replaceAll(
    'https://framerusercontent.com/images/wxpAecGN18uH8LxIHrSmqj7J5s.png?width=938&height=898',
    '/assets/img/cfee386c5d59b88e.webp'
  );
  content = content.replaceAll(
    'https://framerusercontent.com/images/wxpAecGN18uH8LxIHrSmqj7J5s.png',
    '/assets/img/cfee386c5d59b88e.webp'
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Patched: ${file}`);
    totalReplacements++;
  }
}

console.log(`\nSuccessfully patched ${totalReplacements} bundle file(s).`);

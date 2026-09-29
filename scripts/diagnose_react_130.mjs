import fs from 'node:fs';
import path from 'node:path';

// Let's import the bundle or simulate its execution in node
// Note: We can import the bundle directly in node!
const bundlePath = path.resolve('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs');

console.log('Loading bundle in Node to inspect all exported and imported components...');

try {
  const mod = await import('file:///' + bundlePath.replace(/\\/g, '/'));
  console.log('Bundle loaded successfully!');
  console.log('Default export:', typeof mod.default, mod.default?.displayName || mod.default?.name);
  console.log('Framer metadata:', mod.__FramerMetadata__);
} catch (e) {
  console.error('Error importing bundle:', e);
}

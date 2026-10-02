import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const srcImage1 = 'C:/Users/yugme/.gemini/antigravity-ide/brain/c573a1d7-0334-4a19-80b7-696dbf1393a4/.user_uploaded/media_1790964499564.jpg';
const srcImage2 = 'C:/Users/yugme/.gemini/antigravity-ide/brain/c573a1d7-0334-4a19-80b7-696dbf1393a4/.user_uploaded/media_1790964624953.jpg';

async function processImages() {
  const imgDir = path.resolve('public/assets/img');
  if (!fs.existsSync(srcImage1)) {
    throw new Error('Source image 1 not found: ' + srcImage1);
  }
  if (!fs.existsSync(srcImage2)) {
    throw new Error('Source image 2 not found: ' + srcImage2);
  }

  console.log('Both source images found. Processing with sharp...');

  // ===================== Image 1 (Front portrait / Solo traveller) =====================
  // 1. High-res WebP for ae83aba71780ab07.webp (870x870 / square)
  await sharp(srcImage1)
    .resize(870, 870, { fit: 'cover' })
    .webp({ quality: 92 })
    .toFile(path.join(imgDir, 'ae83aba71780ab07.webp'));
  console.log('✓ Generated ae83aba71780ab07.webp (870x870)');

  // 2. 512w WebP for d15774e64fdfb82a.webp
  await sharp(srcImage1)
    .resize(512, 512, { fit: 'cover' })
    .webp({ quality: 88 })
    .toFile(path.join(imgDir, 'd15774e64fdfb82a.webp'));
  console.log('✓ Generated d15774e64fdfb82a.webp (512x512)');

  // 3. Contact photo cfee386c5d59b88e.webp
  await sharp(srcImage1)
    .resize(938, 938, { fit: 'cover' })
    .webp({ quality: 92 })
    .toFile(path.join(imgDir, 'cfee386c5d59b88e.webp'));
  console.log('✓ Generated cfee386c5d59b88e.webp (938x938)');

  // 4. Contact photo smaller e13ac167615ff339.webp
  await sharp(srcImage1)
    .resize(512, 512, { fit: 'cover' })
    .webp({ quality: 88 })
    .toFile(path.join(imgDir, 'e13ac167615ff339.webp'));
  console.log('✓ Generated e13ac167615ff339.webp (512x512)');

  // 5. Named profile assets
  await sharp(srcImage1)
    .resize(1024, 1024, { fit: 'cover' })
    .webp({ quality: 95 })
    .toFile(path.join(imgDir, 'yug_profile.webp'));

  await sharp(srcImage1)
    .resize(1024, 1024, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(imgDir, 'yug_profile.jpg'));

  await sharp(srcImage1)
    .resize(1200, 630, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 92 })
    .toFile(path.join(imgDir, 'og_yug.jpg'));

  fs.copyFileSync(srcImage1, path.join(imgDir, 'whatsapp_july1.jpeg'));

  // ===================== Image 2 (Santorini caldera view) =====================
  // 6. Polaroid 2 image: 2df96adc70b14976.webp (683x1024)
  await sharp(srcImage2)
    .resize(683, 1024, { fit: 'cover' })
    .webp({ quality: 92 })
    .toFile(path.join(imgDir, '2df96adc70b14976.webp'));
  console.log('✓ Generated 2df96adc70b14976.webp (683x1024)');

  await sharp(srcImage2)
    .resize(1024, 1024, { fit: 'cover' })
    .webp({ quality: 95 })
    .toFile(path.join(imgDir, 'yug_profile_2.webp'));

  await sharp(srcImage2)
    .resize(1024, 1024, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(imgDir, 'yug_profile_2.jpg'));

  console.log('All photo assets generated and updated successfully!');
}

processImages().catch(err => {
  console.error('Error processing images:', err);
  process.exit(1);
});

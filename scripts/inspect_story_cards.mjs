import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Check card components rendered in story
const storyCards = ['15xqkt6', '705mjb', 'bml7qr', '1pbq76w', '1sbsau2', '10gofpt'];

storyCards.forEach(cls => {
  const regex = new RegExp(`[^\`]*${cls}[^\`]*`, 'g');
  console.log(`=== ${cls} ===`);
  const matches = bundle.match(regex);
  if (matches) {
    matches.slice(0, 5).forEach(m => console.log('  ', m.slice(0, 200)));
  }
});

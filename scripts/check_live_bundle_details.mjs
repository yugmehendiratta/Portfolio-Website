async function checkLiveBundleDetails() {
  const url = `https://yug-designsite.vercel.app/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs?t=${Date.now()}`;
  const res = await fetch(url);
  const text = await res.text();
  
  const badYtCall = text.includes('o(yt,{') || text.includes('o(yt, {');
  const badStCall = text.includes('o(St,{') || text.includes('o(St, {');
  const badBtCall = text.includes('o(bt,{') || text.includes('o(bt, {');
  const badXtCall = text.includes('o(xt,{') || text.includes('o(xt, {');
  
  const doubleComma = text.includes(',,');

  console.log('--- LIVE VERCEL BUNDLE AUDIT ---');
  console.log('Bad o(yt, { call present:', badYtCall);
  console.log('Bad o(St, { call present:', badStCall);
  console.log('Bad o(bt, { call present:', badBtCall);
  console.log('Bad o(xt, { call present:', badXtCall);
  console.log('Stray double comma ,, present:', doubleComma);
  console.log('x-vercel-id:', res.headers.get('x-vercel-id'));
}

checkLiveBundleDetails().catch(console.error);

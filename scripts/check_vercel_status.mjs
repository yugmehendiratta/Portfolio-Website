async function checkDeployment() {
  const url = `https://yug-designsite.vercel.app/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs?t=${Date.now()}`;
  const res = await fetch(url);
  const text = await res.text();
  
  // Check if our minimum fix is in the live deployed bundle
  // In the fix, we replaced o(yt, { animationDistance... with o(B, { animationDistance...
  const hasFix = text.includes('o(B,{animationDistance') || text.includes('o(B, { animationDistance');
  const hasOldYt = text.includes('o(yt,{animationDistance') || text.includes('o(yt, { animationDistance');
  
  console.log('Live Vercel Bundle Check:');
  console.log('Has new fix component B:', hasFix);
  console.log('Has old bug component yt:', hasOldYt);
  console.log('Vercel Age / Cache headers:', res.headers.get('x-vercel-id'), res.headers.get('age'));
}

checkDeployment().catch(console.error);

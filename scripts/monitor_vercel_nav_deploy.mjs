async function monitorVercelDeployment() {
  console.log('Monitoring Vercel deployment for commit 078c2e9...');
  
  for (let attempt = 1; attempt <= 30; attempt++) {
    const timestamp = Date.now();
    try {
      const bundleUrl = `https://yug-designsite.vercel.app/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs?t=${timestamp}`;
      const res = await fetch(bundleUrl);
      const text = await res.text();
      
      const hasFixedNav = text.includes('.framer-NrOiv .framer-1ukjnmv { position: fixed; left: 48px; top: 50%;') ||
                          text.includes('.framer-NrOiv .framer-1ukjnmv{position:fixed;left:48px;top:50%;') ||
                          text.includes('position: fixed; left: 48px; top: 50%;');
      
      const hasOldSticky = text.includes('.framer-NrOiv .framer-1ukjnmv { position: sticky; top: 150px;') ||
                           text.includes('position: sticky; top: 150px;');

      console.log(`[Attempt ${attempt}/30] Status: ${res.status} | Has Fixed Nav: ${hasFixedNav} | Has Old Sticky: ${hasOldSticky} | x-vercel-id: ${res.headers.get('x-vercel-id')}`);
      
      if (hasFixedNav && !hasOldSticky) {
        console.log('\n>>> SUCCESS: Vercel deployment with commit 078c2e9 is LIVE and VERIFIED!');
        return true;
      }
    } catch (e) {
      console.log(`[Attempt ${attempt}/30] Error fetching:`, e.message);
    }
    
    await new Promise(r => setTimeout(r, 6000));
  }
  
  console.log('Timed out waiting for Vercel deployment.');
  return false;
}

monitorVercelDeployment().catch(console.error);

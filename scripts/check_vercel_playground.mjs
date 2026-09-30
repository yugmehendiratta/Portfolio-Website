async function checkPlaygroundLive() {
  const url = `https://yug-designsite.vercel.app/play-ground?t=${Date.now()}`;
  const res = await fetch(url);
  const text = await res.text();
  
  const hasNowPlaying = text.includes('Now Playing · Midnight Coffee');
  const hasDailyFocus = text.includes('Daily Focus · Research &amp; WIP') || text.includes('Daily Focus · Research & WIP');
  const hasAppleRadius = text.includes('24px');
  
  console.log('Live Vercel Playground Page Check:');
  console.log('Has Now Playing badge:', hasNowPlaying);
  console.log('Has Daily Focus badge:', hasDailyFocus);
  console.log('Has Apple 24px radius:', hasAppleRadius);
  console.log('Vercel ID:', res.headers.get('x-vercel-id'));
}

checkPlaygroundLive().catch(console.error);

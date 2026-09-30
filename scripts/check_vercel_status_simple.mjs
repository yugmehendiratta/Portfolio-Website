async function check() {
  const res = await fetch(`https://yug-designsite.vercel.app/play-ground?t=${Date.now()}`);
  const text = await res.text();
  console.log('Contains Just me again font:', text.includes('Just me again down here'));
  console.log('Contains current wip:', text.includes('current wip'));
  console.log('Contains golden hour glow:', text.includes('golden hour glow'));
  console.log('Vercel ID:', res.headers.get('x-vercel-id'));
}
check();

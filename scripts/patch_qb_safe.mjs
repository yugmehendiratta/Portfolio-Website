import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/framer.5HYnILGs.mjs', 'utf8');

// Find `qb=(e,t,n)=>`
const target = 'qb=(e,t,n)=>A.forwardRef((i,a)=>{let{sheet:o,cache:s}=A.useContext(Vb)??{},c=n;if(!kn()){Ye(t)&&(t=t(so(),i));let e=Array.isArray(t)?t.join(`\n`):t;Yb.add(e,c)}return r(()=>{c&&Gb.has(c)||(Ye(t)?t(so(),i):Array.isArray(t)?t:t.split(`\n`)).forEach(e=>e&&oo(e,o,s))},[]),T(e,{...i,ref:a})})';

const replacement = 'qb=(e,t,n)=>A.forwardRef((i,a)=>{let{sheet:o,cache:s}=A.useContext(Vb)??{},c=n;if(!kn()){if(t!=null){Ye(t)&&(t=t(so(),i));let e=Array.isArray(t)?t.join(`\n`):t;Yb.add(e,c)}}}return r(()=>{if(t==null){console.error("QB_UNDEFINED_STYLES:",e?.displayName||e?.name||e,"class:",c);return;}c&&Gb.has(c)||(Ye(t)?t(so(),i):Array.isArray(t)?t:t.split(`\n`)).forEach(e=>e&&oo(e,o,s))},[]),T(e,{...i,ref:a})})';

if (code.includes('qb=(e,t,n)=>A.forwardRef')) {
  // Let's replace the effect part safely
  const oldPart = 'r(()=>{c&&Gb.has(c)||(Ye(t)?t(so(),i):Array.isArray(t)?t:t.split(`\n`)).forEach(e=>e&&oo(e,o,s))},[])';
  const newPart = 'r(()=>{if(t==null){console.error("QB_UNDEFINED_STYLES:",e?.displayName||e?.name||e,"class:",c);return;}c&&Gb.has(c)||(Ye(t)?t(so(),i):Array.isArray(t)?t:typeof t==="string"?t.split(`\n`):[]).forEach(e=>e&&oo(e,o,s))},[])';
  const patched = code.replace(oldPart, newPart);
  fs.writeFileSync('public/assets/framer/framer.5HYnILGs.mjs', patched);
  console.log('Patched qb in framer.5HYnILGs.mjs');
}

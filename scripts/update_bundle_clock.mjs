import fs from 'node:fs';

let content = fs.readFileSync('public/assets/framer/0yBLd0PB0ip5Rzs9-QLcfoj4dY2kFE0yzHwiORtPyPw.Ca3Fwr26.mjs', 'utf8');

const tnOld = 'function tn(e,t,n){let r=new Date,i={hour:`numeric`,minute:`numeric`,second:t?`numeric`:void 0,hour12:!n,timeZone:e};return new Intl.DateTimeFormat(`en-US`,i).format(r)}';

const tnNew = 'function tn(e,t,n){let r=new Date,i={hour:`numeric`,minute:`numeric`,second:t?`numeric`:void 0,hour12:!n,timeZone:e||`Asia/Kolkata`};return new Intl.DateTimeFormat(`en-US`,i).format(r)+` IST`}';

if (!content.includes(tnOld)) {
  console.error('Could not find tnOld in bundle!');
  process.exit(1);
}

content = content.replace(tnOld, tnNew);

const locOld = 'location:`Canada/Pacific`';
const locNew = 'location:`Asia/Kolkata`';

if (!content.includes(locOld)) {
  console.error('Could not find locOld in bundle!');
  process.exit(1);
}

content = content.replaceAll(locOld, locNew);

fs.writeFileSync('public/assets/framer/0yBLd0PB0ip5Rzs9-QLcfoj4dY2kFE0yzHwiORtPyPw.Ca3Fwr26.mjs', content, 'utf8');
console.log('Successfully updated 0yBLd0PB0ip5Rzs9-QLcfoj4dY2kFE0yzHwiORtPyPw.Ca3Fwr26.mjs');

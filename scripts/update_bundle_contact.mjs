import fs from 'node:fs';

let content = fs.readFileSync('public/assets/framer/script_main.B4-njmYi.mjs', 'utf8');

const tOld = 'children:_(k.div,{...h,...b,className:V(N,`framer-zqh0pq`,u,v),"data-framer-name":`Intactive`,"data-highlight":!0,layoutDependency:E,layoutId:`KN2FOv4Pf`,onMouseEnter:j,ref:r,style:{backgroundColor:`var(--token-eee4728f-06ef-4d99-9d02-ac8944e7f6dd, rgb(226, 226, 226))`,borderBottomLeftRadius:32,borderBottomRightRadius:32,borderTopLeftRadius:32,borderTopRightRadius:32,...l}';

const tNew = 'children:_(k.a,{...h,...b,href:(m===`EM`||m===`Email`)?`mailto:work.yug29@gmail.com`:`tel:+917988865453`,className:V(N,`framer-zqh0pq`,u,v),"data-framer-name":`Intactive`,"data-highlight":!0,layoutDependency:E,layoutId:`KN2FOv4Pf`,onMouseEnter:j,ref:r,style:{backgroundColor:`var(--token-eee4728f-06ef-4d99-9d02-ac8944e7f6dd, rgb(226, 226, 226))`,borderBottomLeftRadius:32,borderBottomRightRadius:32,borderTopLeftRadius:32,borderTopRightRadius:32,textDecoration:`none`,display:`block`,...l}';

if (!content.includes(tOld)) {
  console.error('Could not find tOld in script_main!');
  process.exit(1);
}

content = content.replace(tOld, tNew);

const mailtoOld = 'href:`mailto:Hello@selenadesigns.com`';
const mailtoNew = 'href:`mailto:work.yug29@gmail.com`';
if (!content.includes(mailtoOld)) {
  console.error('Could not find mailtoOld in script_main!');
  process.exit(1);
}
content = content.replace(mailtoOld, mailtoNew);

const telOld = 'href:`tel:+123456789`';
const telNew = 'href:`tel:+917988865453`';
if (!content.includes(telOld)) {
  console.error('Could not find telOld in script_main!');
  process.exit(1);
}
content = content.replace(telOld, telNew);

fs.writeFileSync('public/assets/framer/script_main.B4-njmYi.mjs', content, 'utf8');
console.log('Successfully updated script_main.B4-njmYi.mjs');

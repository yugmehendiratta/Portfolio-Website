const fs = require('fs');
const file = 'public/assets/framer/0yBLd0PB0ip5Rzs9-QLcfoj4dY2kFE0yzHwiORtPyPw.Ca3Fwr26.mjs';
let content = fs.readFileSync(file, 'utf8');
content = content.replace('‎‎I\'m Bejaman [] a product designer in Chicago who gets excited [] about making complicated things simple []. ', '‎‎I\'m Yug 🧠, a product designer obsessed with the "why" before the "how."');
fs.writeFileSync(file, content);

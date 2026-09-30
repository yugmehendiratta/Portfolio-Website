import fs from 'node:fs';

const bundlePath = 'public/assets/framer/_9FaulcuY-8Jg7L1RR8R1jW2umXwQdNSmDxHy8adZOY.D3FaWtBt.mjs';
let bundle = fs.readFileSync(bundlePath, 'utf8');

const newItems = [
  {
    fontFamily: `Just me again down here`,
    fontSize: 32,
    gap: -30,
    image: `/assets/img/playground_spotify.jpg`,
    link: `https://open.spotify.com`,
    linkNewTab: true,
    noteBg: `var(--token-3b25897c-a78c-4fb0-9a93-831975a769c1, rgb(161, 223, 197))`,
    noteColor: `rgb(0, 0, 0)`,
    notePosition: `top`,
    noteText: `on repeat 🎧`,
    size: 300
  },
  {
    fontFamily: `Just me again down here`,
    fontSize: 32,
    gap: -20,
    image: `/assets/img/playground_notepad.jpg`,
    link: ``,
    linkNewTab: false,
    noteBg: `var(--token-cd9da077-16e0-46f3-9a80-6bf4c2a79928, rgb(245, 221, 161))`,
    noteColor: `var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))`,
    notePosition: `bottom`,
    noteText: `current wip & research 📌`,
    size: 280
  },
  {
    fontFamily: `Just me again down here`,
    fontSize: 32,
    gap: -20,
    image: `/assets/img/playground_sunset.jpg`,
    link: ``,
    linkNewTab: false,
    noteBg: `var(--token-221f5458-30ad-42f0-b005-7c3d9fe30e8d, rgb(250, 190, 209))`,
    noteColor: `var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))`,
    notePosition: `top`,
    noteText: `golden hour glow 🌅`,
    size: 260
  },
  {
    fontFamily: `Just me again down here`,
    fontSize: 32,
    gap: -50,
    image: `/assets/img/playground_netflix.jpg`,
    link: `https://www.netflix.com`,
    linkNewTab: true,
    noteBg: `var(--token-a40bc7b7-fed8-4930-b9f7-5dc39bc097a2, rgb(164, 229, 248))`,
    noteColor: `var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))`,
    notePosition: `bottom`,
    noteText: `movie night 🍿`,
    size: 320
  },
  {
    fontFamily: `Just me again down here`,
    fontSize: 32,
    gap: -20,
    image: `/assets/img/playground_coffee.jpg`,
    link: ``,
    linkNewTab: false,
    noteBg: `var(--token-cd9da077-16e0-46f3-9a80-6bf4c2a79928, rgb(245, 221, 161))`,
    noteColor: `var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))`,
    notePosition: `right`,
    noteText: `coffee & pixels ☕`,
    size: 250
  },
  {
    fontFamily: `Just me again down here`,
    fontSize: 32,
    gap: -20,
    image: `/assets/img/playground_desk.jpg`,
    link: ``,
    linkNewTab: false,
    noteBg: `var(--token-3b25897c-a78c-4fb0-9a93-831975a769c1, rgb(161, 223, 197))`,
    noteColor: `rgb(0, 0, 0)`,
    notePosition: `left`,
    noteText: `where ideas grow 💡`,
    size: 340
  },
  {
    fontFamily: `Just me again down here`,
    fontSize: 32,
    gap: -30,
    image: `/assets/img/e60d1ad393b6febd.webp`,
    link: ``,
    linkNewTab: false,
    noteBg: `var(--token-a40bc7b7-fed8-4930-b9f7-5dc39bc097a2, rgb(164, 229, 248))`,
    noteColor: `var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))`,
    notePosition: `top`,
    noteText: `finding patterns 📐`,
    size: 280
  },
  {
    fontFamily: `Just me again down here`,
    fontSize: 32,
    gap: -20,
    image: `/assets/img/f585d81b1e9c01d8.webp`,
    link: ``,
    linkNewTab: false,
    noteBg: `var(--token-221f5458-30ad-42f0-b005-7c3d9fe30e8d, rgb(250, 190, 209))`,
    noteColor: `var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))`,
    notePosition: `bottom`,
    noteText: `tiny moments ✨`,
    size: 240
  }
];

const itemsString = 'items:' + JSON.stringify(newItems).replace(/"([^"]+)":/g, '$1:').replace(/"/g, '`');

const idx = bundle.indexOf('items:[');
let closeIdx = idx + 6;
let depth = 1;
while (depth > 0 && closeIdx < bundle.length) {
  closeIdx++;
  if (bundle[closeIdx] === '[') depth++;
  if (bundle[closeIdx] === ']') depth--;
}

bundle = bundle.slice(0, idx) + itemsString + bundle.slice(closeIdx + 1);

fs.writeFileSync(bundlePath, bundle);
console.log('Updated playground bundle items successfully');

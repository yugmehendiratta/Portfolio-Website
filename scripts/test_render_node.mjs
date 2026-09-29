import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const bundlePath = path.resolve('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs');
const mod = await import('file:///' + bundlePath.replace(/\\/g, '/'));

console.log('Testing render of mod.default...');
try {
  const element = React.createElement(mod.default, {
    locale: 'default',
    breakpoint: '1fzvxue'
  });
  const html = ReactDOMServer.renderToString(element);
  console.log('Render succeeded! HTML length:', html.length);
} catch (err) {
  console.error('Render FAILED with error:');
  console.error(err);
}

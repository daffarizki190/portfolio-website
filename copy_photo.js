const fs = require('fs');
const path = require('path');

const src = 'C:/Users/MyBook Hype AMD/Downloads/9c259938-307c-4e98-8214-ed82a9a5f521.png';
const dstPng = path.join(__dirname, 'public', 'photo_daffa.png');

fs.copyFileSync(src, dstPng);
console.log('Copied PNG to:', dstPng);

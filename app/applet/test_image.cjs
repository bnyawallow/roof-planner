const fs = require('fs');
const buf = fs.readFileSync('src/assets/images/images/box_profile.png');
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
console.log('Width:', width, 'Height:', height);

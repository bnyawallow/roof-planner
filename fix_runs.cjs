const fs = require('fs');
let code = fs.readFileSync('src/components/Measurements.tsx', 'utf-8');

// Replace pullIn for Front View
code = code.replace(/const pullIn = Math\.min\(\(sRun \* scale\), frontRoofW \/ 2\);/g, 'const pullIn = Math.min(((eRun + O) * scale), frontRoofW / 2);');

// Replace pullInW for Side View
code = code.replace(/const pullInW = Math\.min\(\(eRun \* scale\), sideRoofW \/ 2\);/g, 'const pullInW = Math.min(((sRun + O) * scale), sideRoofW / 2);');

fs.writeFileSync('src/components/Measurements.tsx', code);
console.log('Done fixing runs and overhang scales for side views.');

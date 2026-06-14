const fs = require('fs');

let navbarCode = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
navbarCode = navbarCode.replace('src={getImage("/logo.png")}', 'src="/logo.png"');
fs.writeFileSync('src/components/Navbar.tsx', navbarCode);

let summaryCode = fs.readFileSync('src/components/Summary.tsx', 'utf8');
summaryCode = summaryCode.replace("await loadImage('/images/logo.png')", "await loadImage('/logo.png')");
fs.writeFileSync('src/components/Summary.tsx', summaryCode);

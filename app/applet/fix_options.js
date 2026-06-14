const fs = require('fs');
let code = fs.readFileSync('src/components/OptionsSelection.tsx', 'utf8');
if (!code.includes('import { getImage } from \'../lib/images\';')) {
    code = code.replace("import { cn } from '../lib/utils';", "import { cn } from '../lib/utils';\nimport { getImage } from '../lib/images';");
}
code = code.replace(/return `\/images\/profiles\/\$\{folder\}\/\$\{colorStr\}\.\$\{ext\}`;/g, "return getImage(`/profiles/${folder}/${colorStr}.${ext}`);");
code = code.replace(/return `\/profiles\/\$\{folder\}\/\$\{colorStr\}\.\$\{ext\}`;/g, "return getImage(`/profiles/${folder}/${colorStr}.${ext}`);");
fs.writeFileSync('src/components/OptionsSelection.tsx', code);

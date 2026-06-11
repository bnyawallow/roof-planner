const fs = require('fs');
let code = fs.readFileSync('src/components/Measurements.tsx', 'utf-8');

const generateSideSvg = () => {
return `<svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible transition-all duration-300">
              <defs>
              {renderPattern()}
                <linearGradient id="roofGradient1_side" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={cs_1} /><stop offset="100%" stopColor={cs_2} />
                </linearGradient>
              </defs>
              {(() => {
                const sideHouseW = wScale;
                const sideX = 50 - sideHouseW / 2;
                const sideHouseH = 30;
                const sideY = 90 - sideHouseH;
                const roofTopY = Math.max(sideY - ((w / 2 + O) * Math.tan(pitch * Math.PI / 180) * scale), 10);
                const sideRoofW = sideHouseW + OScale * 2;
                const O_val = OScale;
                const rX1 = sideX - O_val;
                const rX2 = sideX + sideHouseW + O_val;

                return (
                  <g className="animate-in fade-in zoom-in-95 duration-300">
                    <rect x={sideX} y={sideY} width={sideHouseW} height={sideHouseH} fill="#cbd5e1" stroke="#94a3b8" />
                    
                    <text x="50" y="96" fill="#475569" fontSize="3.5" fontWeight="bold" textAnchor="middle">{w.toFixed(1)}m</text>
                    <path d={\`M\${sideX},92 L\${sideX+sideHouseW},92 M\${sideX},91 L\${sideX},93 M\${sideX+sideHouseW},91 L\${sideX+sideHouseW},93\`} stroke="#94a3b8" strokeWidth="0.5" fill="none" />
                    
                    <path d={\`M\${rX1},50 L\${rX1},\${roofTopY - 5} M\${rX2},50 L\${rX2},\${roofTopY - 5}\`} stroke="#fe6a34" strokeWidth="0.25" strokeDasharray="1,1" fill="none" className="transition-all duration-300" />
                    <text x="50" y={roofTopY - 7} fill="#fe6a34" fontSize="3.5" fontWeight="bold" textAnchor="middle">{(w + overhang * 2).toFixed(1)}m</text>
                    <path d={\`M\${rX1},\${roofTopY - 5} L\${rX2},\${roofTopY - 5} M\${rX1},\${roofTopY - 6} L\${rX1},\${roofTopY - 4} M\${rX2},\${roofTopY - 6} L\${rX2},\${roofTopY - 4}\`} stroke="#fe6a34" strokeWidth="0.5" fill="none" className="transition-all duration-300" />
                    
                    {shape === 'gable' && (
                      <RoofPolygon points={\`\${rX1},\${sideY} \${rX2},\${sideY} 50,\${roofTopY}\`} fill="url(#roofGradient1_side)" stroke="#fe6a34" strokeWidth="0.5" />
                    )}
                    {shape === 'hip' && (() => {
                      const pullInW = Math.min((eRun * scale), sideRoofW / 2);
                      return (
                        <RoofPolygon points={\`\${rX1},\${sideY} \${rX2},\${sideY} \${rX2 - pullInW},\${roofTopY} \${rX1 + pullInW},\${roofTopY}\`} fill="url(#roofGradient1_side)" stroke="#fe6a34" strokeWidth="0.5" />
                      );
                    })()}
                    {shape === 'skillion' && (() => {
                      if (skillionDirection === 'front-to-back') {
                        // High front (left side of SVG), low back (right side)
                        return <RoofPolygon points={\`\${rX1},\${roofTopY} \${rX2},\${sideY} \${rX1},\${sideY}\`} fill="url(#roofGradient1_side)" stroke="#fe6a34" strokeWidth="0.5" />
                      } else if (skillionDirection === 'back-to-front') {
                        // Low front (left side), high back (right side)
                        return <RoofPolygon points={\`\${rX1},\${sideY} \${rX2},\${roofTopY} \${rX2},\${sideY}\`} fill="url(#roofGradient1_side)" stroke="#fe6a34" strokeWidth="0.5" />
                      } else {
                        // side view for left/right flow is a flat rectangle
                        return <RoofPolygon points={\`\${rX1},\${roofTopY} \${rX2},\${roofTopY} \${rX2},\${sideY} \${rX1},\${sideY}\`} fill="url(#roofGradient1_side)" stroke="#fe6a34" strokeWidth="0.5" />
                      }
                    })()}
                  </g>
                );
              })()}
            </svg>`;
};

// Side view occurs twice, after h4 with "Side View" text.
const text = String.raw`\s*Side View\s*`;
const regex = new RegExp('<h4 className="[^"]*">' + text + '<\/h4>\\s*<svg viewBox="0 0 100 100" className="[^"]*">\\s*<defs>[\\s\\S]*?<\\/svg>', 'g');
let matchCount = 0;
code = code.replace(regex, (match) => {
    matchCount++;
    return `<h4 className="absolute top-4 left-4 font-bold text-primary-container text-xs font-sans z-10 flex items-center gap-2">
                 Side View
              </h4>
              ` + generateSideSvg();
});

if (matchCount === 2) {
    fs.writeFileSync('src/components/Measurements.tsx', code);
    console.log("Successfully replaced Side Views.");
} else {
    console.log("Could not find the exact Side View matches. Found: " + matchCount);
}

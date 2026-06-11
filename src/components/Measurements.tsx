import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Circle, Ruler, Check, ChevronUp, ChevronDown } from 'lucide-react';
import { RoofingProfile } from '../constants';
import { cn } from '../lib/utils';

interface MeasurementsProps {
  selectedProfile: RoofingProfile;
  onComplete: (data: any) => void;
}

type RoofShape = 'gable' | 'hip' | 'skillion';

const CustomNumberInput = ({ value, onChange, placeholder, step = 0.5, min = 0 }: any) => {
  const handleUp = () => {
    const v = parseFloat(value) || 0;
    onChange((v + step).toFixed(2).replace(/\.?0+$/, ''));
  };
  const handleDown = () => {
    const v = parseFloat(value) || 0;
    onChange(Math.max(min, v - step).toFixed(2).replace(/\.?0+$/, ''));
  };
  return (
    <div className="relative">
      <input 
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-surface-container-highest border-b-2 border-transparent rounded-sm pl-4 pr-16 py-4 text-xl font-bold focus:outline-none focus:border-secondary-container focus:bg-surface-container-lowest transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder={placeholder}
      />
      <div className="absolute right-0 top-0 bottom-0 flex flex-col w-12 border-l border-surface-container-high/50">
        <button onClick={handleUp} className="flex-1 flex items-center justify-center hover:bg-black/5 text-on-surface-variant transition-colors border-b border-surface-container-high/50" aria-label="Increase">
          <ChevronUp className="w-5 h-5" />
        </button>
        <button onClick={handleDown} className="flex-1 flex items-center justify-center hover:bg-black/5 text-on-surface-variant transition-colors" aria-label="Decrease">
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export const Measurements: React.FC<MeasurementsProps> = ({ selectedProfile, onComplete }) => {
  const [shape, setShape] = useState<RoofShape>('gable');
  const [skillionDirection, setSkillionDirection] = useState<'right-to-left'|'left-to-right'|'front-to-back'|'back-to-front'>('front-to-back');
  const [length, setLength] = useState<string>('12.5');
  const [width, setWidth] = useState<string>('8.2');
  const [pitch, setPitch] = useState<number>(30);
  const [overhang, setOverhang] = useState<number>(0.6);
  const [thickness, setThickness] = useState<'28G' | '30G'>('28G');
  const [sheetLength, setSheetLength] = useState<'2M' | '2.5M' | '3M'>('2.5M');
  
  const [hipSideRun, setHipSideRun] = useState<string>('');
  const [hipEndRun, setHipEndRun] = useState<string>('');
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false);

  // Calculations
  const l = parseFloat(length) || 1; // avoid / 0
  const w = parseFloat(width) || 1;
  
  const sRun = hipSideRun ? parseFloat(hipSideRun) : w / 2;
  const eRun = hipEndRun ? parseFloat(hipEndRun) : w / 2;
  
  const trueSqm = useMemo(() => {
    if (l === 0 || w === 0) return 0;
    // Base area with overhangs
    let baseLength = l;
    let baseWidth = w;

    if (shape === 'gable') {
      baseLength += (overhang * 2); // overhang on both gable ends
      baseWidth += (overhang * 2);  // overhang on eaves
    } else if (shape === 'hip') {
      baseLength += (overhang * 2); // overhang all around
      baseWidth += (overhang * 2);
    } else if (shape === 'skillion') {
      baseLength += (overhang * 2);
      baseWidth += (overhang * 2);
    }

    const flatArea = baseLength * baseWidth;
    // True area accounting for pitch
    const pitchRad = (pitch * Math.PI) / 180;
    return flatArea / Math.cos(pitchRad);
  }, [l, w, pitch, overhang, shape]);

  const estimatedSheets = Math.ceil(trueSqm / 2.4);

  const renderVisualization = () => {
    const maxBase = Math.max(l, w, 0.1); 
    const O = overhang;
    const maxExtent = maxBase + O * 2;
    const scale = 70 / maxExtent;
    
    const lScale = l * scale;
    const wScale = w * scale;
    const OScale = O * scale;
    
    return (
      <div className="w-full flex flex-col md:flex-row h-[400px] md:h-[450px] bg-[#eaeff7] rounded-lg border border-surface-container-high relative overflow-hidden transition-all">
        
        {/* Left Panel: Top View */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-[#cdd5e0] relative flex items-center justify-center p-4">
           <h4 className="absolute top-4 left-4 font-bold text-primary-container text-xs font-sans z-10 flex items-center gap-2">
             Top View
           </h4>
           <svg viewBox="-5 -5 110 110" className="w-full h-full drop-shadow-xl overflow-visible transition-all duration-500 ease-in-out">
            <defs>
              <linearGradient id="roofGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#253569" />
                <stop offset="100%" stopColor="#121a34" />
              </linearGradient>
              <linearGradient id="roofGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#31427d" />
                <stop offset="100%" stopColor="#1a2444" />
              </linearGradient>
              <linearGradient id="roofGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e2a52" />
                <stop offset="100%" stopColor="#0a0f21" />
              </linearGradient>
            </defs>
            <g className="animate-in fade-in zoom-in-95 duration-300">
              {(() => {
                 const houseW = lScale;
                 const houseH = wScale;
                 const houseX = 50 - houseW / 2;
                 const houseY = 50 - houseH / 2;
                 
                 const roofX1 = houseX - OScale;
                 const roofX2 = houseX + houseW + OScale;
                 const roofY1 = houseY - OScale;
                 const roofY2 = houseY + houseH + OScale;
                 
                 return (
                   <>
                     {shape === 'gable' && (
                       <>
                         <polygon points={`${roofX1},${roofY1} ${roofX2},${roofY1} ${roofX2},50 ${roofX1},50`} fill="url(#roofGradient1)" stroke="#fe6a34" strokeWidth="0.5" />
                         <polygon points={`${roofX1},50 ${roofX2},50 ${roofX2},${roofY2} ${roofX1},${roofY2}`} fill="url(#roofGradient2)" stroke="#fe6a34" strokeWidth="0.5" />
                         <line x1={roofX1} y1="50" x2={roofX2} y2="50" stroke="#fe6a34" strokeWidth="1.5" />
                       </>
                     )}
                     
                     {shape === 'hip' && (() => {
                       const er = Math.min(eRun * scale, houseW / 2 + OScale);
                       const sr = Math.min(sRun * scale, houseH / 2 + OScale);
                       
                       const rx1 = Math.min(roofX1 + er, 50);
                       const rx2 = Math.max(roofX2 - er, 50);
                       const ry1 = Math.min(roofY1 + sr, 50);
                       const ry2 = Math.max(roofY2 - sr, 50);

                       return (
                         <>
                           <polygon points={`${roofX1},${roofY1} ${roofX2},${roofY1} ${rx2},${ry1} ${rx1},${ry1}`} fill="url(#roofGradient1)" stroke="#fe6a34" strokeWidth="0.5" />
                           <polygon points={`${roofX1},${roofY2} ${roofX2},${roofY2} ${rx2},${ry2} ${rx1},${ry2}`} fill="url(#roofGradient2)" stroke="#fe6a34" strokeWidth="0.5" />
                           <polygon points={`${roofX1},${roofY1} ${rx1},${ry1} ${rx1},${ry2} ${roofX1},${roofY2}`} fill="url(#roofGradient3)" stroke="#fe6a34" strokeWidth="0.5" />
                           <polygon points={`${roofX2},${roofY1} ${rx2},${ry1} ${rx2},${ry2} ${roofX2},${roofY2}`} fill="url(#roofGradient3)" stroke="#fe6a34" strokeWidth="0.5" />
                           <line x1={rx1} y1={ry1} x2={rx2} y2={ry1} stroke="#fe6a34" strokeWidth="1" />
                           {ry1 !== ry2 && <line x1={rx1} y1={ry2} x2={rx2} y2={ry2} stroke="#fe6a34" strokeWidth="1" />}
                           {ry1 !== ry2 && <line x1={rx1} y1={ry1} x2={rx1} y2={ry2} stroke="#fe6a34" strokeWidth="1" />}
                           {ry1 !== ry2 && <line x1={rx2} y1={ry1} x2={rx2} y2={ry2} stroke="#fe6a34" strokeWidth="1" />}
                         </>
                       );
                     })()}

                     {shape === 'skillion' && (() => {
                        return (
                          <>
                            <polygon points={`${roofX1},${roofY1} ${roofX2},${roofY1} ${roofX2},${roofY2} ${roofX1},${roofY2}`} fill="url(#roofGradient1)" stroke="#fe6a34" strokeWidth="1" />
                            {skillionDirection === 'front-to-back' && <path d="M50,30 L50,70 M45,65 L50,70 L55,65" fill="none" stroke="#fe6a34" strokeWidth="2" strokeOpacity="0.7" />}
                            {skillionDirection === 'back-to-front' && <path d="M50,70 L50,30 M45,35 L50,30 L55,35" fill="none" stroke="#fe6a34" strokeWidth="2" strokeOpacity="0.7" />}
                            {skillionDirection === 'left-to-right' && <path d="M30,50 L70,50 M65,45 L70,50 L65,55" fill="none" stroke="#fe6a34" strokeWidth="2" strokeOpacity="0.7" />}
                            {skillionDirection === 'right-to-left' && <path d="M70,50 L30,50 M35,45 L30,50 L35,55" fill="none" stroke="#fe6a34" strokeWidth="2" strokeOpacity="0.7" />}
                          </>
                        );
                     })()}

                     {/* WALL OUTLINE */}
                     <rect x={houseX} y={houseY} width={houseW} height={houseH} fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.8" />
                     
                     {/* DIMENSIONS */}
                     <text x="50" y={houseY - 2} fill="#475569" fontSize="3.5" fontWeight="bold" textAnchor="middle">{l.toFixed(1)}m</text>
                     <path d={`M${houseX},${houseY - 1} L${houseX+houseW},${houseY - 1} M${houseX},${houseY - 2} L${houseX},${houseY} M${houseX+houseW},${houseY - 2} L${houseX+houseW},${houseY}`} stroke="#94a3b8" strokeWidth="0.5" fill="none" />
                     
                     <text x={houseX - 2} y="50" fill="#475569" fontSize="3.5" fontWeight="bold" textAnchor="middle" transform={`rotate(-90 ${houseX - 2}, 50)`}>{w.toFixed(1)}m</text>
                     <path d={`M${houseX - 1},${houseY} L${houseX - 1},${houseY+houseH} M${houseX - 2},${houseY} L${houseX},${houseY} M${houseX - 2},${houseY+houseH} L${houseX},${houseY+houseH}`} stroke="#94a3b8" strokeWidth="0.5" fill="none" />
                     
                     <path d={`M${roofX1},${roofX1} L${roofX1},${roofY1 - 5} M${roofX2},${roofX1} L${roofX2},${roofY1 - 5}`} stroke="#fe6a34" strokeWidth="0.25" strokeDasharray="1,1" fill="none" className="transition-all duration-500" />
                     <text x="50" y={roofY1 - 6} fill="#fe6a34" fontSize="3.5" fontWeight="bold" textAnchor="middle">{(l + overhang * 2).toFixed(1)}m</text>
                     <path d={`M${roofX1},${roofY1 - 4} L${roofX2},${roofY1 - 4} M${roofX1},${roofY1 - 5} L${roofX1},${roofY1 - 3} M${roofX2},${roofY1 - 5} L${roofX2},${roofY1 - 3}`} stroke="#fe6a34" strokeWidth="0.5" fill="none" className="transition-all duration-500" />
                     
                     <path d={`M${roofX1},${roofY1} L${roofX1 - 5},${roofY1} M${roofX1},${roofY2} L${roofX1 - 5},${roofY2}`} stroke="#fe6a34" strokeWidth="0.25" strokeDasharray="1,1" fill="none" className="transition-all duration-500" />
                     <text x={roofX1 - 6} y="50" fill="#fe6a34" fontSize="3.5" fontWeight="bold" textAnchor="middle" transform={`rotate(-90 ${roofX1 - 6},50)`}>{(w + overhang * 2).toFixed(1)}m</text>
                     <path d={`M${roofX1 - 4},${roofY1} L${roofX1 - 4},${roofY2} M${roofX1 - 5},${roofY1} L${roofX1 - 3},${roofY1} M${roofX1 - 5},${roofY2} L${roofX1 - 3},${roofY2}`} stroke="#fe6a34" strokeWidth="0.5" fill="none" className="transition-all duration-500" />
                   </>
                 );
               })()}
            </g>
           </svg>
        </div>

        {/* Right Panel: Divider for Front & Side Views */}
        <div className="flex w-full md:w-1/2 h-1/2 md:h-full flex-col">
          
          {/* Top Right: Front View */}
          <div className="h-1/2 border-b border-[#cdd5e0] relative flex items-center justify-center p-4">
            <h4 className="absolute top-4 left-4 font-bold text-primary-container text-xs font-sans z-10 flex items-center gap-2">
               Front View
            </h4>
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible transition-all duration-300">
              <defs>
                <linearGradient id="roofGradient2_front" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#31427d" />
                  <stop offset="100%" stopColor="#1a2444" />
                </linearGradient>
              </defs>
              {(() => {
                const frontHouseW = lScale;
                const frontX = 50 - frontHouseW / 2;
                const frontHouseH = 30;
                const frontY = 90 - frontHouseH;
                const roofTopY = Math.max(frontY - ((w / 2 + O) * Math.tan(pitch * Math.PI / 180) * scale), 10);
                const frontRoofW = frontHouseW + OScale * 2;
                const O_val = OScale;
                const rX1 = frontX - O_val;
                const rX2 = frontX + frontHouseW + O_val;

                return (
                  <g className="animate-in fade-in zoom-in-95 duration-300">
                    <rect x={frontX} y={frontY} width={frontHouseW} height={frontHouseH} fill="#cbd5e1" stroke="#94a3b8" />
                    
                    <text x="50" y="96" fill="#475569" fontSize="3.5" fontWeight="bold" textAnchor="middle">{l.toFixed(1)}m</text>
                    <path d={`M${frontX},92 L${frontX+frontHouseW},92 M${frontX},91 L${frontX},93 M${frontX+frontHouseW},91 L${frontX+frontHouseW},93`} stroke="#94a3b8" strokeWidth="0.5" fill="none" />
                    
                    <path d={`M${rX1},50 L${rX1},${roofTopY - 5} M${rX2},50 L${rX2},${roofTopY - 5}`} stroke="#fe6a34" strokeWidth="0.25" strokeDasharray="1,1" fill="none" className="transition-all duration-300" />
                    <text x="50" y={roofTopY - 7} fill="#fe6a34" fontSize="3.5" fontWeight="bold" textAnchor="middle">{(l + overhang * 2).toFixed(1)}m</text>
                    <path d={`M${rX1},${roofTopY - 5} L${rX2},${roofTopY - 5} M${rX1},${roofTopY - 6} L${rX1},${roofTopY - 4} M${rX2},${roofTopY - 6} L${rX2},${roofTopY - 4}`} stroke="#fe6a34" strokeWidth="0.5" fill="none" className="transition-all duration-300" />
                    
                    {shape === 'gable' && (
                      <polygon points={`${rX1},${frontY} ${rX2},${frontY} ${rX2},${roofTopY} ${rX1},${roofTopY}`} fill="url(#roofGradient2_front)" stroke="#fe6a34" strokeWidth="0.5" />
                    )}
                    {shape === 'hip' && (() => {
                      const pullIn = Math.min((sRun * scale), frontRoofW / 2);
                      return (
                        <polygon points={`${rX1},${frontY} ${rX2},${frontY} ${rX2 - pullIn},${roofTopY} ${rX1 + pullIn},${roofTopY}`} fill="url(#roofGradient2_front)" stroke="#fe6a34" strokeWidth="0.5" />
                      );
                    })()}
                    {shape === 'skillion' && (() => {
                      if (skillionDirection === 'left-to-right') {
                        // High left, low right (wedge pointing right)
                        return <polygon points={`${rX1},${roofTopY} ${rX2},${frontY} ${rX1},${frontY}`} fill="url(#roofGradient2_front)" stroke="#fe6a34" strokeWidth="0.5" />
                      } else if (skillionDirection === 'right-to-left') {
                        // High right, low left (wedge pointing left)
                        return <polygon points={`${rX1},${frontY} ${rX2},${roofTopY} ${rX2},${frontY}`} fill="url(#roofGradient2_front)" stroke="#fe6a34" strokeWidth="0.5" />
                      } else {
                        // Front-to-back flow looks like a flat rectangle from the front
                        return <polygon points={`${rX1},${roofTopY} ${rX2},${roofTopY} ${rX2},${frontY} ${rX1},${frontY}`} fill="url(#roofGradient2_front)" stroke="#fe6a34" strokeWidth="0.5" />
                      }
                    })()}
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Bottom Right: Side View */}
          <div className="h-1/2 relative flex items-center justify-center p-4">
            <h4 className="absolute top-4 left-4 font-bold text-primary-container text-xs font-sans z-10 flex items-center gap-2">
               Side View
            </h4>
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible transition-all duration-300">
              <defs>
                <linearGradient id="roofGradient1_side" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#253569" />
                  <stop offset="100%" stopColor="#121a34" />
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
                    <rect x={sideX} y={sideY} width={sideHouseW} height={sideHouseH} fill="#e2e8f0" stroke="#94a3b8" />
                    
                    <text x="50" y="96" fill="#475569" fontSize="3.5" fontWeight="bold" textAnchor="middle">{w.toFixed(1)}m</text>
                    <path d={`M${sideX},92 L${sideX+sideHouseW},92 M${sideX},91 L${sideX},93 M${sideX+sideHouseW},91 L${sideX+sideHouseW},93`} stroke="#94a3b8" strokeWidth="0.5" fill="none" />
                    
                    <path d={`M${rX1},50 L${rX1},${roofTopY - 5} M${rX2},50 L${rX2},${roofTopY - 5}`} stroke="#fe6a34" strokeWidth="0.25" strokeDasharray="1,1" fill="none" className="transition-all duration-300" />
                    <text x="50" y={roofTopY - 7} fill="#fe6a34" fontSize="3.5" fontWeight="bold" textAnchor="middle">{(w + overhang * 2).toFixed(1)}m</text>
                    <path d={`M${rX1},${roofTopY - 5} L${rX2},${roofTopY - 5} M${rX1},${roofTopY - 6} L${rX1},${roofTopY - 4} M${rX2},${roofTopY - 6} L${rX2},${roofTopY - 4}`} stroke="#fe6a34" strokeWidth="0.5" fill="none" className="transition-all duration-300" />
                    
                    {shape === 'gable' && (
                      <polygon points={`${rX1},${sideY} ${rX2},${sideY} 50,${roofTopY}`} fill="url(#roofGradient1_side)" stroke="#fe6a34" strokeWidth="0.5" />
                    )}
                    {shape === 'hip' && (() => {
                      const pullInW = Math.min((eRun * scale), sideRoofW / 2);
                      return (
                        <polygon points={`${rX1},${sideY} ${rX2},${sideY} ${rX2 - pullInW},${roofTopY} ${rX1 + pullInW},${roofTopY}`} fill="url(#roofGradient1_side)" stroke="#fe6a34" strokeWidth="0.5" />
                      );
                    })()}
                    {shape === 'skillion' && (() => {
                      if (skillionDirection === 'front-to-back') {
                        // High front (left side of SVG), low back (right side)
                        return <polygon points={`${rX1},${roofTopY} ${rX2},${sideY} ${rX1},${sideY}`} fill="url(#roofGradient1_side)" stroke="#fe6a34" strokeWidth="0.5" />
                      } else if (skillionDirection === 'back-to-front') {
                        // Low front (left side), high back (right side)
                        return <polygon points={`${rX1},${sideY} ${rX2},${roofTopY} ${rX2},${sideY}`} fill="url(#roofGradient1_side)" stroke="#fe6a34" strokeWidth="0.5" />
                      } else {
                        // side view for left/right flow is a flat rectangle
                        return <polygon points={`${rX1},${roofTopY} ${rX2},${roofTopY} ${rX2},${sideY} ${rX1},${sideY}`} fill="url(#roofGradient1_side)" stroke="#fe6a34" strokeWidth="0.5" />
                      }
                    })()}
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-32 px-6 max-w-screen-2xl mx-auto min-h-screen">
      <header className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-black tracking-[-0.02em] text-primary-container leading-tight">Geometry &<br/>Dimensions</h1>
        <p className="mt-6 text-on-surface-variant max-w-2xl text-lg leading-relaxed font-sans">
          Precision is the foundation of structural integrity. Select your roof shape, adjust the pitch and baseline dimensions, and our engine will calculate exact requirements.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-7 space-y-8">
          
          {/* Visualizer (Appears first on mobile, next to controls on desktop structurally) */}
          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-ambient">
            {renderVisualization()}
          </div>

          <div className="flex justify-start mb-6">
            <button
               onClick={() => setIsAdvancedMode(!isAdvancedMode)}
               className="flex items-center gap-3 p-1.5 rounded-full bg-surface-container-low pr-4 transition-all hover:bg-surface-container-high border border-black/5"
               aria-pressed={isAdvancedMode}
               aria-label="Toggle Advanced View"
            >
              <div className={cn(
                "relative w-12 h-6 rounded-full transition-colors duration-300",
                isAdvancedMode ? "bg-secondary-container" : "bg-on-surface-variant/30"
              )}>
                <div className={cn(
                  "absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300",
                  isAdvancedMode ? "translate-x-6" : "translate-x-0"
                )}></div>
              </div>
              <span className="text-sm font-bold text-primary-container select-none">
                 Advanced Configuration
              </span>
            </button>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient">
            {isAdvancedMode && (
              <>
                <h3 className="tech-label text-on-surface-variant mb-6 text-lg">1. Roof Shape & Architecture</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  {([
                    { id: 'gable', label: 'Gable (Pitched)' }, 
                    { id: 'hip', label: 'Hip Roof' }, 
                    { id: 'skillion', label: 'Skillion (Flat/Sloped)' }
                  ] as const).map(s => (
                    <button
                      key={s.id}
                      onClick={() => setShape(s.id as RoofShape)}
                      className={cn(
                        "relative py-4 px-3 rounded-md font-sans font-bold text-sm transition-all text-center flex flex-col items-center justify-center gap-2",
                        shape === s.id ? "bg-primary-container text-white shadow-md ring-2 ring-secondary-container ring-offset-2" : "bg-surface-container-high text-primary-container hover:bg-surface-container-low"
                      )}
                    >
                      {shape === s.id && <Check className="absolute top-2 right-2 w-4 h-4 text-secondary-container" />}
                      {s.label}
                    </button>
                  ))}
                </div>
                {shape === 'skillion' && (
                  <div className="mb-10 ani-fade-in">
                    <label className="block tech-label text-on-surface-variant mb-4">Slope Direction</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {([
                        { id: 'front-to-back', label: 'Front to Back', icon: '↑' },
                        { id: 'back-to-front', label: 'Back to Front', icon: '↓' },
                        { id: 'left-to-right', label: 'Left to Right', icon: '→' },
                        { id: 'right-to-left', label: 'Right to Left', icon: '←' }
                      ] as const).map(dir => (
                        <button
                          key={dir.id}
                          onClick={() => setSkillionDirection(dir.id)}
                          className={cn(
                            "py-3 px-2 rounded-md font-sans text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2",
                            skillionDirection === dir.id ? "bg-secondary-container text-white shadow-sm" : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                          )}
                        >
                          <span className="text-lg leading-none">{dir.icon}</span>
                          {dir.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <h3 className="tech-label text-on-surface-variant mb-6 text-lg">{isAdvancedMode ? '2. Base Measurements' : 'Base Measurements'}</h3>
            <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 mb-8", !isAdvancedMode && "lg:grid-cols-3")}>
              <div className="space-y-2">
                <label className="block tech-label text-on-surface-variant">House Length (Meters)</label>
                <CustomNumberInput 
                  value={length}
                  onChange={setLength}
                  placeholder="12.5"
                  step={0.5}
                  min={1}
                />
              </div>
              <div className="space-y-2">
                <label className="block tech-label text-on-surface-variant">House Width (Meters)</label>
                <CustomNumberInput 
                  value={width}
                  onChange={setWidth}
                  placeholder="8.2"
                  step={0.5}
                  min={1}
                />
              </div>
              {!isAdvancedMode && (
                <div className="space-y-2">
                  <label className="block tech-label text-on-surface-variant">Eaves Overhang (Meters)</label>
                  <CustomNumberInput 
                    value={overhang}
                    onChange={(val: any) => setOverhang(Number(val))}
                    placeholder="0.6"
                    step={0.1}
                    min={0}
                  />
                </div>
              )}
            </div>

            {isAdvancedMode && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="flex items-center justify-between tech-label text-on-surface-variant mb-2">
                    <span>Roof Pitch (Angle)</span>
                    <span className="font-headline font-bold text-primary-container text-lg">{pitch}°</span>
                  </label>
                  <input 
                    type="range" 
                    min="5" 
                    max="60" 
                    value={pitch} 
                    onChange={(e) => setPitch(Number(e.target.value))}
                    className="w-full accent-secondary-container h-2 bg-surface-container-high rounded-full appearance-none outline-none"
                  />
                </div>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between tech-label text-on-surface-variant mb-2">
                    <span>Eaves Overhang</span>
                    <span className="font-headline font-bold text-primary-container text-lg">{overhang.toFixed(1)}m</span>
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1.5" 
                    step="0.1"
                    value={overhang} 
                    onChange={(e) => setOverhang(Number(e.target.value))}
                    className="w-full accent-secondary-container h-2 bg-surface-container-high rounded-full appearance-none outline-none"
                  />
                </div>
              </div>
            )}

            {isAdvancedMode && shape === 'hip' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 border-t border-surface-container-high pt-8">
                <div className="space-y-2">
                  <label className="flex items-center justify-between tech-label text-on-surface-variant mb-2">
                    <span>Side Run (Meters)</span>
                    <span className="font-sans text-xs opacity-60">Auto: {(w/2).toFixed(2)}m</span>
                  </label>
                  <CustomNumberInput 
                    value={hipSideRun}
                    onChange={setHipSideRun}
                    placeholder={`${(w/2).toFixed(2)}`}
                    step={0.1}
                    min={0.1}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center justify-between tech-label text-on-surface-variant mb-2">
                    <span>End Run (Meters)</span>
                    <span className="font-sans text-xs opacity-60">Auto: {(w/2).toFixed(2)}m</span>
                  </label>
                  <CustomNumberInput 
                    value={hipEndRun}
                    onChange={setHipEndRun}
                    placeholder={`${(w/2).toFixed(2)}`}
                    step={0.1}
                    min={0.1}
                  />
                </div>
              </div>
            )}

          </div>

          {isAdvancedMode && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-surface-container-lowest shadow-ambient rounded-xl p-8">
                <h3 className="tech-label text-on-surface-variant mb-6 text-lg">3. Steel Thickness</h3>
                <div className="space-y-4">
                  <button 
                    onClick={() => setThickness('28G')}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-sm transition-all text-left",
                      thickness === '28G' ? "bg-surface-container-high border-l-4 border-secondary-container" : "bg-surface-container-low hover:bg-surface-container-high border-l-4 border-transparent"
                    )}
                  >
                    <div>
                      <span className="block font-bold text-primary-container font-sans">28G Premium (0.32mm)</span>
                      <span className="text-xs text-on-surface-variant mt-1 block font-sans">Higher durability, prevents oil-canning.</span>
                    </div>
                    {thickness === '28G' && <CheckCircle className="w-5 h-5 text-secondary-container fill-current" />}
                  </button>
                  <button 
                    onClick={() => setThickness('30G')}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-sm transition-all text-left",
                      thickness === '30G' ? "bg-surface-container-high border-l-4 border-secondary-container" : "bg-surface-container-low hover:bg-surface-container-high border-l-4 border-transparent"
                    )}
                  >
                    <div>
                      <span className="block font-bold text-primary-container font-sans">30G Standard (0.25mm)</span>
                      <span className="text-xs text-on-surface-variant mt-1 block font-sans">Economic residential option.</span>
                    </div>
                    {thickness === '30G' && <CheckCircle className="w-5 h-5 text-secondary-container fill-current" />}
                  </button>
                </div>
              </div>

              <div className="bg-surface-container-lowest shadow-ambient rounded-xl p-8">
                <h3 className="tech-label text-on-surface-variant mb-6 text-lg">4. Sheet Length</h3>
                <div className="grid grid-cols-1 gap-4">
                  {(['2M', '2.5M', '3M'] as const).map((len) => (
                    <button 
                      key={len}
                      onClick={() => setSheetLength(len)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-sm transition-all text-left",
                        sheetLength === len ? "bg-primary-container text-white shadow-ambient" : "bg-surface-container-low hover:bg-surface-container-high text-primary-container"
                      )}
                    >
                      <span className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs",
                        sheetLength === len ? "bg-secondary-container text-white" : "bg-white text-primary-container"
                      )}>
                        {len}
                      </span>
                      <span className="font-bold font-sans">{len === '2M' ? 'Short' : len === '2.5M' ? 'Standard' : 'Long'} Runs</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-8">
            <div className="hero-gradient rounded-xl p-8 text-white shadow-ambient relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container blur-[100px] opacity-20 -mr-32 -mt-32"></div>
              <h3 className="tech-label opacity-60 mb-8">True Surface Area</h3>
              
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-7xl font-black tracking-[-0.02em] font-headline">{trueSqm.toFixed(1)}</span>
                <span className="text-2xl font-bold opacity-40 font-headline">SQM</span>
              </div>
              
              {isAdvancedMode ? (
                <div className="space-y-2 mb-8 mt-6 text-sm font-sans">
                  <div className="flex justify-between items-center text-white/80">
                    <span>Base Footprint</span>
                    <span className="font-bold font-mono">{(l * w).toFixed(1)} sqm</span>
                  </div>
                  <div className="flex justify-between items-center text-white/80 border-t border-white/10 pt-2">
                    <span>Overhang Area</span>
                    <span className="font-bold font-mono">+{((l * w) === 0 ? 0 : (shape === 'gable' ? ((l+(overhang*2)) * (w+(overhang*2)) - (l*w)) : ((l+(overhang*2)) * (w+(overhang*2)) - (l*w)))).toFixed(1)} sqm</span>
                  </div>
                  <div className="flex justify-between items-center text-secondary-container font-bold border-t border-white/20 pt-2">
                    <span>Pitch Variation ({pitch}°)</span>
                    <span className="font-mono">x {(1 / Math.cos(pitch * Math.PI / 180)).toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xs font-sans mt-4">
                  Standard residential gable roof estimate based on a standard 30° pitch and 0.6m overhang. Use advanced view to customize.
                </p>
              )}

              <div className="pt-6 flex justify-between items-center relative mt-auto border-t border-white/10">
                <div>
                  <div className="text-sm font-bold opacity-60 mb-1">Required Material</div>
                  <div className="text-2xl font-bold font-headline">{estimatedSheets} Sheets</div>
                </div>
                <button 
                  onClick={() => onComplete({ sqm: trueSqm, estimatedSheets, thickness, sheetLength, length, width, shape, pitch, overhang, sideRun: sRun, endRun: eRun })}
                  className="bg-secondary-container text-white px-6 py-4 rounded-md font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-[#ff7b4b] active:scale-95 shadow-ambient flex items-center gap-2 group"
                >
                  Continue
                  <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



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
              <rect x="25" y="25" width="50" height="50" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
              
              {/* House dimensions */}
              <text x="50" y="22" fill="#475569" fontSize="3.5" fontWeight="bold" textAnchor="middle">{l.toFixed(1)}m</text>
              <path d="M25,23.5 L75,23.5 M25,22.5 L25,24.5 M75,22.5 L75,24.5" stroke="#94a3b8" strokeWidth="0.5" fill="none" />
              
              <text x="22" y="50" fill="#475569" fontSize="3.5" fontWeight="bold" textAnchor="middle" transform="rotate(-90 22,50)">{w.toFixed(1)}m</text>
              <path d="M23.5,25 L23.5,75 M22.5,25 L24.5,25 M22.5,75 L24.5,75" stroke="#94a3b8" strokeWidth="0.5" fill="none" />

              {(() => {
                 const S = 1 + (overhang * 0.05);
                 const rMin = 50 - 35 * S;
                 const rMax = 50 + 35 * S;
                 return (
                   <>
                     {/* Extension lines for roof length */}
                     <path d={`M${rMin},${rMin} L${rMin},4 M${rMax},${rMin} L${rMax},4`} stroke="#fe6a34" strokeWidth="0.25" strokeDasharray="1,1" fill="none" className="transition-all duration-500" />
                     <text x="50" y="2" fill="#fe6a34" fontSize="3.5" fontWeight="bold" textAnchor="middle">{(l + overhang * 2).toFixed(1)}m</text>
                     <path d={`M${rMin},5 L${rMax},5 M${rMin},4 L${rMin},6 M${rMax},4 L${rMax},6`} stroke="#fe6a34" strokeWidth="0.5" fill="none" className="transition-all duration-500" />
                     
                     {/* Extension lines for roof width */}
                     <path d={`M${rMin},${rMin} L4,${rMin} M${rMin},${rMax} L4,${rMax}`} stroke="#fe6a34" strokeWidth="0.25" strokeDasharray="1,1" fill="none" className="transition-all duration-500" />
                     <text x="2" y="50" fill="#fe6a34" fontSize="3.5" fontWeight="bold" textAnchor="middle" transform="rotate(-90 2,50)">{(w + overhang * 2).toFixed(1)}m</text>
                     <path d={`M5,${rMin} L5,${rMax} M4,${rMin} L6,${rMin} M4,${rMax} L6,${rMax}`} stroke="#fe6a34" strokeWidth="0.5" fill="none" className="transition-all duration-500" />
                   </>
                 );
              })()}

              <g transform={`scale(${1 + (overhang * 0.05)})`} transformOrigin="50 50" className="transition-transform duration-500">
                {shape === 'gable' && (
                  <>
                    <polygon points="15,15 85,15 85,50 15,50" fill="url(#roofGradient1)" stroke="#fe6a34" strokeWidth="0.5" />
                    <polygon points="15,50 85,50 85,85 15,85" fill="url(#roofGradient2)" stroke="#fe6a34" strokeWidth="0.5" />
                    <line x1="15" y1="50" x2="85" y2="50" stroke="#fe6a34" strokeWidth="1.5" />
                  </>
                )}
                
                {shape === 'hip' && (() => {
                  const rx1 = 15 + 70 * (sRun / l);
                  const rx2 = 85 - 70 * (sRun / l);
                  const ry = 15 + 70 * (eRun / w);
                  const ry2_actual = 85 - 70 * (eRun / w);
                  
                  const safeRx1 = Math.min(rx1, 50);
                  const safeRx2 = Math.max(rx2, 50);
                  const safeRy = Math.min(ry, 50);
                  const ry2 = Math.max(ry2_actual, 50);
                  
                  return (
                  <>
                    <polygon points={`15,15 85,15 ${safeRx2},${safeRy} ${safeRx1},${safeRy}`} fill="url(#roofGradient1)" stroke="#fe6a34" strokeWidth="0.5" />
                    <polygon points={`15,85 85,85 ${safeRx2},${ry2} ${safeRx1},${ry2}`} fill="url(#roofGradient2)" stroke="#fe6a34" strokeWidth="0.5" />
                    <polygon points={`15,15 ${safeRx1},${safeRy} ${safeRx1},${ry2} 15,85`} fill="url(#roofGradient3)" stroke="#fe6a34" strokeWidth="0.5" />
                    <polygon points={`85,15 ${safeRx2},${safeRy} ${safeRx2},${ry2} 85,85`} fill="url(#roofGradient3)" stroke="#fe6a34" strokeWidth="0.5" />
                    <line x1={safeRx1} y1={safeRy} x2={safeRx2} y2={safeRy} stroke="#fe6a34" strokeWidth="1" />
                    {(safeRy !== ry2) && <line x1={safeRx1} y1={ry2} x2={safeRx2} y2={ry2} stroke="#fe6a34" strokeWidth="1" />}
                    {(safeRy !== ry2) && <line x1={safeRx1} y1={safeRy} x2={safeRx1} y2={ry2} stroke="#fe6a34" strokeWidth="1" />}
                    {(safeRy !== ry2) && <line x1={safeRx2} y1={safeRy} x2={safeRx2} y2={ry2} stroke="#fe6a34" strokeWidth="1" />}
                  </>
                  );
                })()}

                {shape === 'skillion' && (
                  <>
                    <polygon points="15,15 85,15 85,85 15,85" fill="url(#roofGradient1)" stroke="#fe6a34" strokeWidth="1" />
                    <path d="M50,30 L50,70 M45,65 L50,70 L55,65" fill="none" stroke="#fe6a34" strokeWidth="2" strokeOpacity="0.7" />
                  </>
                )}
              </g>
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
                const lengthScale = 70 / Math.max(l, 0.1);
                const O = overhang * lengthScale;
                const frontRoofH = Math.min(((w / 2 + overhang) * Math.tan(pitch * Math.PI / 180)) * lengthScale, 35) || 15;
                const roofTopY = 50 - frontRoofH;
                return (
                  <g className="animate-in fade-in zoom-in-95 duration-300">
                    <rect x="15" y="50" width="70" height="35" fill="#cbd5e1" stroke="#94a3b8" />
                    
                    {/* Window and Door */}
                    <rect x="22" y="60" width="15" height="15" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />
                    <rect x="52" y="60" width="16" height="25" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />
                    <line x1="52" y1="72" x2="68" y2="72" stroke="#94a3b8" strokeWidth="0.5" />
                    
                    {/* House dimension */}
                    <text x="50" y="93" fill="#475569" fontSize="3.5" fontWeight="bold" textAnchor="middle">{l.toFixed(1)}m</text>
                    <path d="M15,89 L85,89 M15,88 L15,90 M85,88 L85,90" stroke="#94a3b8" strokeWidth="0.5" fill="none" />
                    
                    {/* Roof dimension */}
                    <path d={`M${15 - O},50 L${15 - O},${roofTopY - 5} M${85 + O},50 L${85 + O},${roofTopY - 5}`} stroke="#fe6a34" strokeWidth="0.25" strokeDasharray="1,1" fill="none" className="transition-all duration-300" />
                    <text x="50" y={roofTopY - 7} fill="#fe6a34" fontSize="3.5" fontWeight="bold" textAnchor="middle">{(l + overhang * 2).toFixed(1)}m</text>
                    <path d={`M${15 - O},${roofTopY - 5} L${85 + O},${roofTopY - 5} M${15 - O},${roofTopY - 6} L${15 - O},${roofTopY - 4} M${85 + O},${roofTopY - 6} L${85 + O},${roofTopY - 4}`} stroke="#fe6a34" strokeWidth="0.5" fill="none" className="transition-all duration-300" />
                    
                    {shape === 'gable' && (
                      <polygon points={`${15-O},50 ${85+O},50 ${85+O},${50-frontRoofH} ${15-O},${50-frontRoofH}`} fill="url(#roofGradient2_front)" stroke="#fe6a34" strokeWidth="0.5" />
                    )}
                    {shape === 'hip' && (() => {
                      const pullIn = Math.min((sRun / l) * 70, 35);
                      return (
                        <polygon points={`${15-O},50 ${85+O},50 ${85-pullIn},${50-frontRoofH} ${15+pullIn},${50-frontRoofH}`} fill="url(#roofGradient2_front)" stroke="#fe6a34" strokeWidth="0.5" />
                      );
                    })()}
                    {shape === 'skillion' && (
                      <polygon points={`${15-O},50 ${85+O},50 ${85+O},${50-frontRoofH} ${15-O},${50-frontRoofH}`} fill="url(#roofGradient2_front)" stroke="#fe6a34" strokeWidth="0.5" />
                    )}
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
                const widthScale = 60 / Math.max(w, 0.1);
                const O = overhang * widthScale;
                const sideRoofH = Math.min(((w / 2 + overhang) * Math.tan(pitch * Math.PI / 180)) * widthScale, 35) || 15;
                const roofTopY = 50 - sideRoofH;
                return (
                  <g className="animate-in fade-in zoom-in-95 duration-300">
                    <rect x="20" y="50" width="60" height="35" fill="#e2e8f0" stroke="#94a3b8" />
                    
                    {/* Window only */}
                    <rect x="42" y="60" width="16" height="15" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5" />
                    
                    {/* House dimension */}
                    <text x="50" y="93" fill="#475569" fontSize="3.5" fontWeight="bold" textAnchor="middle">{w.toFixed(1)}m</text>
                    <path d="M20,89 L80,89 M20,88 L20,90 M80,88 L80,90" stroke="#94a3b8" strokeWidth="0.5" fill="none" />
                    
                    {/* Roof dimension */}
                    <path d={`M${20 - O},50 L${20 - O},${roofTopY - 5} M${80 + O},50 L${80 + O},${roofTopY - 5}`} stroke="#fe6a34" strokeWidth="0.25" strokeDasharray="1,1" fill="none" className="transition-all duration-300" />
                    <text x="50" y={roofTopY - 7} fill="#fe6a34" fontSize="3.5" fontWeight="bold" textAnchor="middle">{(w + overhang * 2).toFixed(1)}m</text>
                    <path d={`M${20 - O},${roofTopY - 5} L${80 + O},${roofTopY - 5} M${20 - O},${roofTopY - 6} L${20 - O},${roofTopY - 4} M${80 + O},${roofTopY - 6} L${80 + O},${roofTopY - 4}`} stroke="#fe6a34" strokeWidth="0.5" fill="none" className="transition-all duration-300" />
                    
                    {shape === 'gable' && (
                      <polygon points={`${20-O},50 ${80+O},50 50,${50-sideRoofH}`} fill="url(#roofGradient1_side)" stroke="#fe6a34" strokeWidth="0.5" />
                    )}
                    {shape === 'hip' && (() => {
                      const pullInW = Math.min((eRun / w) * 60, 30);
                      return (
                        <polygon points={`${20-O},50 ${80+O},50 ${80-pullInW},${50-sideRoofH} ${20+pullInW},${50-sideRoofH}`} fill="url(#roofGradient1_side)" stroke="#fe6a34" strokeWidth="0.5" />
                      );
                    })()}
                    {shape === 'skillion' && (
                      <polygon points={`${20-O},50 ${80+O},${50-sideRoofH} ${20-O},50`} fill="url(#roofGradient1_side)" stroke="#fe6a34" strokeWidth="0.5" />
                    )}
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
              </>
            )}

            <h3 className="tech-label text-on-surface-variant mb-6 text-lg">{isAdvancedMode ? '2. Base Measurements' : 'Base Measurements'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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



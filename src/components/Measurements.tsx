import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Circle, Ruler } from 'lucide-react';
import { RoofingProfile } from '../constants';
import { cn } from '../lib/utils';

interface MeasurementsProps {
  selectedProfile: RoofingProfile;
  onComplete: (data: any) => void;
}

export const Measurements: React.FC<MeasurementsProps> = ({ selectedProfile, onComplete }) => {
  const [length, setLength] = useState<string>('12.5');
  const [width, setWidth] = useState<string>('8.2');
  const [thickness, setThickness] = useState<'28G' | '30G'>('28G');
  const [sheetLength, setSheetLength] = useState<'2M' | '2.5M' | '3M'>('2.5M');

  const sqm = (parseFloat(length) || 0) * (parseFloat(width) || 0);
  const estimatedSheets = Math.ceil(sqm / 2.4); // Mock calculation

  return (
    <div className="pt-28 pb-32 px-6 max-w-screen-2xl mx-auto min-h-screen">
      <header className="mb-12">
        <span className="text-secondary-container tech-label mb-4 block">Section 02 — Measurements</span>
        <h1 className="font-headline text-4xl md:text-5xl font-black tracking-[-0.02em] text-primary-container leading-tight">Geometry &<br/>Dimensions</h1>
        <p className="mt-6 text-on-surface-variant max-w-2xl text-lg leading-relaxed font-sans">
          Precision is the foundation of structural integrity. Enter your roof baseline dimensions below to calculate the exact load requirements and sheet distribution.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 bg-secondary-container rounded-sm"></div>
              <h3 className="text-2xl font-bold tracking-[-0.02em] font-headline text-primary-container">Base Measurements</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block tech-label text-on-surface-variant">House Length (M)</label>
                <div className="relative">
                  <input 
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full bg-surface-container-highest border-b-2 border-transparent rounded-sm px-4 py-4 text-xl font-bold focus:outline-none focus:border-secondary-container focus:bg-surface-container-lowest transition-all"
                    placeholder="12.5"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">M</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block tech-label text-on-surface-variant">House Width (M)</label>
                <div className="relative">
                  <input 
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full bg-surface-container-highest border-b-2 border-transparent rounded-sm px-4 py-4 text-xl font-bold focus:outline-none focus:border-secondary-container focus:bg-surface-container-lowest transition-all"
                    placeholder="8.2"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">M</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-lowest shadow-ambient rounded-xl p-8">
              <h3 className="tech-label text-on-surface-variant mb-6">Steel Thickness</h3>
              <div className="space-y-6">
                <button 
                  onClick={() => setThickness('28G')}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-sm transition-all text-left",
                    thickness === '28G' ? "bg-surface-container-high" : "bg-surface-container-low hover:bg-surface-container-high"
                  )}
                >
                  <div>
                    <span className="block font-bold text-primary-container font-sans">28G Premium (0.32mm)</span>
                    <span className="text-[10px] uppercase font-bold text-secondary-container block mb-1">Residential Standard</span>
                    <span className="text-xs text-on-surface-variant leading-tight block font-sans">Prevents oil-canning and significantly reduces rain noise.</span>
                  </div>
                  {thickness === '28G' ? <CheckCircle className="w-5 h-5 text-secondary-container fill-current" /> : <Circle className="w-5 h-5 text-on-surface-variant/30" />}
                </button>
                <button 
                  onClick={() => setThickness('30G')}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-sm transition-all text-left",
                    thickness === '30G' ? "bg-surface-container-high" : "bg-surface-container-low hover:bg-surface-container-high"
                  )}
                >
                  <div>
                    <span className="block font-bold text-primary-container font-sans">30G Standard (0.25mm)</span>
                    <span className="text-xs text-on-surface-variant leading-tight block font-sans">Economic option for budget-conscious projects.</span>
                  </div>
                  {thickness === '30G' ? <CheckCircle className="w-5 h-5 text-secondary-container fill-current" /> : <Circle className="w-5 h-5 text-on-surface-variant/30" />}
                </button>
              </div>
            </div>

            <div className="bg-surface-container-lowest shadow-ambient rounded-xl p-8">
              <h3 className="tech-label text-on-surface-variant mb-6">Sheet Length</h3>
              <div className="grid grid-cols-1 gap-6">
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
                      "w-10 h-10 rounded-sm flex items-center justify-center font-bold text-xs",
                      sheetLength === len ? "bg-secondary-container text-white" : "bg-primary-container text-white"
                    )}>
                      {len}
                    </span>
                    <span className="font-bold font-sans">{len === '2M' ? 'Small' : len === '2.5M' ? 'Medium' : 'Large'}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-8">
            <div className="hero-gradient rounded-xl p-8 text-white shadow-ambient relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container blur-[100px] opacity-20 -mr-32 -mt-32"></div>
              <h3 className="tech-label opacity-60 mb-8">Estimated Surface Area</h3>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-7xl font-black tracking-[-0.02em] font-headline">{sqm.toFixed(1)}</span>
                <span className="text-2xl font-bold opacity-40 font-headline">SQM</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xs font-sans">
                Based on a standard 30° pitch. Final calculations may vary during structural audit.
              </p>
              <div className="pt-8 flex justify-between items-center relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10 rounded-sm"></div>
                <div className="mt-4">
                  <span className="block tech-label opacity-40">Estimated Sheets</span>
                  <span className="text-xl font-bold font-headline">{estimatedSheets} Units</span>
                </div>
                <button 
                  onClick={() => onComplete({ sqm, estimatedSheets, thickness, sheetLength, length, width })}
                  className="bg-secondary-container text-white px-8 py-4 rounded-md font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-[#ff7b4b] active:scale-95 shadow-ambient mt-4 flex items-center gap-2 group"
                >
                  Generate Estimate
                  <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-ambient">
              <div className="p-6 flex justify-between items-center bg-surface-container-low">
                <span className="font-bold text-primary-container flex items-center gap-2 font-sans">
                  <Ruler className="w-5 h-5" />
                  Plan View 01
                </span>
                <span className="tech-label text-on-surface-variant">Scale 1:100</span>
              </div>
              <div className="h-64 blueprint-grid flex items-center justify-center relative">
                <div className="w-48 h-32 border-4 border-primary-fixed-dim relative">
                  <div className="absolute inset-0 border-2 border-primary-container flex items-center justify-center">
                    <div className="w-full h-1 bg-secondary-container absolute top-1/2"></div>
                    <div className="h-full w-1 bg-secondary-container absolute left-1/2"></div>
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 tech-label text-on-surface-variant">{length}M</span>
                  <span className="absolute -left-10 top-1/2 -translate-y-1/2 tech-label text-on-surface-variant -rotate-90">{width}M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


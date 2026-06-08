import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, ShieldCheck, Paintbrush } from 'lucide-react';
import { RoofingProfile, COLOR_OPTIONS, ColorOption } from '../constants';
import { cn } from '../lib/utils';

interface ColorSelectionProps {
  selectedProfile: RoofingProfile;
  selectedColor: ColorOption;
  onColorSelect: (color: ColorOption) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ColorSelection: React.FC<ColorSelectionProps> = ({
  selectedProfile,
  selectedColor,
  onColorSelect,
  onNext,
  onBack,
}) => {
  return (
    <div className="pb-32 px-6 max-w-screen-2xl mx-auto min-h-screen">
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <button 
            onClick={onBack}
            className="text-sm font-semibold text-secondary-container hover:underline flex items-center gap-1"
          >
            &larr; Back to Profiles
          </button>
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-black tracking-[-0.02em] text-primary-container leading-tight">
          Select Your <br/><span className="text-secondary-container">Roofing Color</span>
        </h1>
        <p className="mt-6 text-on-surface-variant max-w-2xl text-lg leading-relaxed font-sans font-medium">
          Choose the perfect dynamic color for your selected <strong className="text-primary-container font-extrabold">{selectedProfile.title}</strong> profile. All Pinnacle finishes use premium Multi-Clad technology for long-lasting vibrant UV protection and weather resilience.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Live Interactive Preview */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient border border-surface-container-high relative overflow-hidden flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Paintbrush className="w-5 h-5 text-secondary-container" />
                <h3 className="text-xl font-extrabold tracking-[-0.01em] text-primary-container font-headline">Live Material Preview</h3>
              </div>
              <div className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-bold text-on-surface-variant flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedColor.hex }}></span>
                {selectedColor.name}
              </div>
            </div>

            {/* Simulated 3D Matte Roofing Sheet Card */}
            <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-[16/10] sm:aspect-[16/9] border border-slate-800 shadow-xl group">
              {/* Profile Image Base */}
              <img 
                src={selectedProfile.image} 
                alt={selectedProfile.title} 
                className="w-full h-full object-cover select-none transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Advanced Colorized Overlay System */}
              <div 
                className="absolute inset-0 transition-all duration-700 ease-in-out pointer-events-none"
                style={{ 
                  backgroundColor: selectedColor.hex, 
                  mixBlendMode: 'color', 
                  opacity: selectedColor.opacity 
                }}
              />

              {/* Additional Multi-Layer Highlight blend to enrich Red/Green/Brown depths */}
              {selectedColor.id !== 'charcoal' && (
                <div 
                  className="absolute inset-0 transition-all duration-700 ease-in-out pointer-events-none"
                  style={{ 
                    backgroundColor: selectedColor.hex, 
                    mixBlendMode: 'multiply', 
                    opacity: 0.25 
                  }}
                />
              )}

              {/* Gloss Sunlight Highlight Flare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

              {/* Interactive Hover Vignette / Shadows */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Interactive Label Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <h4 className="text-white text-2xl font-black font-headline tracking-tighter drop-shadow-md">
                    {selectedProfile.title}
                  </h4>
                  <p className="text-white/80 text-xs font-bold uppercase tracking-widest mt-1">
                    Premium Matte Finish
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-white/60 text-[10px] uppercase font-bold tracking-wider block">Texture Rating</span>
                  <span className="text-white font-extrabold text-sm px-2 py-0.5 bg-black/40 backdrop-blur-md rounded-sm border border-white/10">Ultra-Grip</span>
                </div>
              </div>
            </div>

            {/* Specs & Performance Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-surface-container-low p-5 rounded-lg flex items-start gap-4">
                <div className="p-2 bg-white rounded-md text-secondary-container shadow-sm shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-primary-container text-sm leading-tight mb-1">Dual-Guard Anti-Fade</h5>
                  <p className="text-on-surface-variant text-xs leading-relaxed font-sans">
                    UV-reflective coating engineered for high noon African solar exposure. Zero chalking or peeling.
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-low p-5 rounded-lg flex items-start gap-4">
                <div className="p-2 bg-white rounded-md text-secondary-container shadow-sm shrink-0">
                  <span className="block text-xs font-extrabold text-secondary-container">15Y</span>
                </div>
                <div>
                  <h5 className="font-bold text-primary-container text-sm leading-tight mb-1">Color Durability Warranty</h5>
                  <p className="text-on-surface-variant text-xs leading-relaxed font-sans">
                    Includes a solid 15-year guarantee against major discoloration, rust, and salt spray erosion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Active Color Selectors */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-on-surface-variant/70 mb-2">
              Available Colors
            </h3>

            <div className="space-y-4">
              {COLOR_OPTIONS.map((color) => {
                const isSelected = selectedColor.id === color.id;

                return (
                  <motion.div
                    key={color.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => onColorSelect(color)}
                    className={cn(
                      "p-5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between shadow-sm",
                      isSelected 
                        ? "border-secondary-container bg-surface-container-lowest shadow-md" 
                        : "border-transparent bg-surface-container-lowest hover:bg-surface-container-low hover:shadow-md"
                    )}
                  >
                    <div className="flex items-center gap-5">
                      {/* Big Color Circle with Swatch border */}
                      <div 
                        className="w-14 h-14 rounded-full border-2 border-white shadow-inner flex items-center justify-center relative scale-100"
                        style={{ backgroundColor: color.hex }}
                      >
                        {isSelected && (
                          <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className="font-bold text-primary-container text-base leading-snug">
                          {color.name}
                        </span>
                        <span className="text-[10px] text-secondary-container font-black uppercase tracking-wider">
                          {color.vibe}
                        </span>
                        <p className="text-on-surface-variant text-xs font-sans font-medium leading-relaxed max-w-[280px] mt-1">
                          {color.description}
                        </p>
                      </div>
                    </div>

                    <div>
                      {isSelected ? (
                        <CheckCircle2 className="w-6 h-6 text-secondary-container fill-current text-white" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-on-surface-variant/25 bg-surface-container-low" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-surface-container-high flex gap-4">
            <button
              onClick={onBack}
              className="px-6 py-4 bg-surface-container-high text-primary-container rounded-md font-bold text-sm transition-all hover:bg-surface-container-highest cursor-pointer inline-flex items-center justify-center"
            >
              Back
            </button>
            <button
              onClick={onNext}
              className="flex-grow bg-secondary-container text-white px-8 py-4 rounded-md font-bold text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-[#ff7b4b] active:scale-95 shadow-ambient flex items-center justify-center gap-2 group cursor-pointer"
            >
              Proceed to Measurements
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { cn } from '../lib/utils';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="fixed top-0 w-full z-50 glass-panel shadow-ambient h-20">
      <div className="flex justify-between items-center w-full px-6 h-full max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3 cursor-pointer h-full" onClick={() => onNavigate('home')}>
          <img src="/logo.png" alt="" className="h-full py-2 w-auto object-contain" />
          <div className="flex flex-col leading-none justify-center">
            <span className="text-xl font-black tracking-tighter text-primary-container font-headline uppercase">Pinnacle</span>
            <span className="text-[10px] font-bold text-secondary-container tracking-widest uppercase">Roofing</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onNavigate('home')}
            className={cn(
              "font-headline font-semibold tracking-tight transition-all px-4 py-2 rounded-sm relative",
              currentPage === 'home' || currentPage === 'profiles' || currentPage === 'measurements' || currentPage === 'summary' 
                ? "text-primary-container bg-surface-container-low" : "text-on-surface-variant hover:bg-surface-container-low"
            )}
          >
            Roof Planner
            {(currentPage === 'home' || currentPage === 'profiles' || currentPage === 'measurements' || currentPage === 'summary') && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-secondary-container rounded-t-sm"></span>
            )}
          </button>
          <a 
            href="https://pinnacleroofing.co.ke"
            target="_blank"
            rel="noopener noreferrer"
            className="font-headline font-semibold tracking-tight text-on-surface-variant hover:bg-surface-container-low transition-all px-4 py-2 rounded-sm"
          >
            Pinnacle Home
          </a>
        </div>

        <div className="flex items-center gap-4">
          {/* Removed WhatsApp and User icons to strictly follow 'only' requirement */}
        </div>
      </div>
    </nav>
  );
};

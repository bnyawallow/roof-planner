import React from 'react';
import { MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="fixed top-0 w-full z-50 glass-panel shadow-ambient h-20">
      <div className="flex justify-between items-center w-full px-6 h-full max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3 cursor-pointer h-full" onClick={() => onNavigate('profiles')}>
          <img src="/logo.png" alt="" className="h-full py-2 w-auto object-contain" />
          <div className="flex flex-col leading-none justify-center">
            <span className="text-xl font-black tracking-tighter text-primary-container font-headline uppercase">Pinnacle</span>
            <span className="text-[10px] font-bold text-secondary-container tracking-widest uppercase">Roofing</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onNavigate('profiles')}
            className={cn(
              "font-headline font-semibold tracking-tight transition-all px-4 py-2 rounded-sm relative",
              currentPage === 'profiles' || currentPage === 'measurements' || currentPage === 'summary' 
                ? "text-primary-container bg-surface-container-low" : "text-on-surface-variant hover:bg-surface-container-low"
            )}
          >
            Roof Planner
            {(currentPage === 'profiles' || currentPage === 'measurements' || currentPage === 'summary') && (
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
          <button className="hidden md:flex items-center gap-2 bg-whatsapp-green text-white px-4 py-2 rounded-sm font-bold text-sm font-sans transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:bg-[#20bd5a] active:scale-95">
            <MessageSquare className="w-4 h-4 fill-current" />
            WhatsApp Expert
          </button>
          <button className="w-10 h-10 rounded-full border border-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

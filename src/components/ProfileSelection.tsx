import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { ROOFING_PROFILES, RoofingProfile } from '../constants';

interface ProfileSelectionProps {
  onSelect: (profile: RoofingProfile) => void;
}

export const ProfileSelection: React.FC<ProfileSelectionProps> = ({ onSelect }) => {
  return (
    <div className="pt-28 pb-32 px-6 max-w-screen-2xl mx-auto min-h-screen">
      <header className="mb-16">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1 w-12 bg-secondary-container rounded-full"></div>
          <span className="tech-label text-on-surface-variant">Step 01: Profile Selection</span>
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-[-0.02em] text-primary-container max-w-4xl leading-[0.9]">
          Select Your <br/><span className="text-secondary-container">Roofing Profile</span>
        </h1>
        <p className="mt-8 text-on-surface-variant text-lg max-w-2xl font-medium leading-relaxed font-sans">
          Precision-engineered for durability and Kenyan climates. Choose the aesthetic that defines your structure's identity from our authentic Pinnacle range.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ROOFING_PROFILES.map((profile, index) => (
          <motion.div 
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(profile)}
            className="group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient hover:bg-surface-container-low transition-all duration-500 cursor-pointer flex flex-col h-full"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={profile.image}
                alt={profile.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <span className="text-white/80 tech-label">{profile.category || 'Pinnacle'}</span>
                <h3 className="text-white text-2xl font-black font-headline leading-tight tracking-[-0.02em]">{profile.title}</h3>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <p className="text-on-surface-variant text-sm font-medium mb-6 font-sans">{profile.description}</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-secondary-container font-black text-sm uppercase tracking-tighter">View Specs</span>
                <div className="bg-surface-container-low p-2 rounded-sm group-hover:bg-secondary-container group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="mt-20 hero-gradient rounded-xl p-8 md:p-12 relative overflow-hidden shadow-ambient">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10 grid md:grid-cols-2 items-center gap-12">
          <div>
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-white tracking-[-0.02em] leading-[1.1]">
              Unsure which profile <br/>fits your project?
            </h2>
            <p className="mt-6 text-primary-fixed-dim text-lg font-sans">
              Our structural engineers are ready to review your blueprints and suggest the optimal profile and gauge for your specific location.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-6">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-sm border-none backdrop-blur-sm self-start md:self-auto shadow-ambient">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary-container">
                <img 
                  alt="Engineer" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVQkiyRnLoLcl-UpSm32HdEeAXXecu20HpdAZdt7A_Ae1fNYlzqSYKuXHVTvq2UnaYMLytm1t2Z_qduJx9_cdLJXYCboAKLCE1SmgH72kgasCUvJV4b1SihxKpWjCf9_wFS8TI1Gy1dDiGQEt5dFDW-V1F2U-puhF_xql_y5OxG1l4_NieCP6ALHKbYc_9_Kg9_cxW2CKwa2AZUISySmKBEtzEqLOnUYXU2ne-Al8gunq2lMw8ixpap0-sG57pzV6r9CjGvOLD5Bw"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="text-white font-bold font-sans">Eng. David K.</p>
                <p className="text-primary-fixed-dim text-xs font-sans">Technical Support Specialist</p>
              </div>
            </div>
            <button className="bg-whatsapp-green text-white flex items-center justify-center gap-3 px-10 py-5 rounded-md font-bold text-sm font-sans w-full md:w-auto shadow-ambient transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-[#20bd5a] active:scale-95 group">
              <MessageSquare className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
              Talk to an Engineer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

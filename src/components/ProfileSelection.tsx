import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { ROOFING_PROFILES, RoofingProfile } from '../constants';
import { ImageWithLoader } from './ImageWithLoader';

interface ProfileSelectionProps {
  onSelect: (profile: RoofingProfile) => void;
}

export const ProfileSelection: React.FC<ProfileSelectionProps> = ({ onSelect }) => {
  return (
    <div className="pb-32 px-6 max-w-screen-2xl mx-auto min-h-screen">
      <header className="mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-[-0.02em] text-primary-container max-w-4xl leading-[1.1]">
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
              <ImageWithLoader 
                containerClassName="absolute inset-0"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={profile.image}
                alt={profile.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-6">
                <h3 className="text-white text-2xl font-black font-headline leading-tight tracking-[-0.02em]">{profile.title}</h3>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <p className="text-on-surface-variant text-sm font-medium mb-6 font-sans">{profile.description}</p>
              <div className="mt-auto">
                <div className="w-full bg-secondary-container text-white py-3.5 px-6 rounded-md font-bold text-sm transition-all duration-300 group-hover:bg-[#ff7b4b] group-hover:shadow-lg flex items-center justify-center gap-2">
                  <span>Select Profile</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

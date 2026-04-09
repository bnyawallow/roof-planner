import React from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-container text-white pt-16 pb-8">
      <div className="px-6 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 relative">
          {/* Subtle background shift instead of border */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5"></div>
          
          {/* Logo and Description */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-black tracking-[-0.02em] uppercase font-headline">Pinnacle</span>
              <div className="bg-white/5 px-2 py-0.5 rounded-sm">
                <span className="tech-label text-white/60">Roofing Systems</span>
              </div>
            </div>
            <p className="text-white/60 text-sm max-w-sm leading-relaxed font-sans">
              Structural precision and aesthetic excellence for modern African landscapes.
            </p>
          </div>

          {/* Contact Us */}
          <div className="md:col-span-4">
            <h5 className="tech-label text-white/40 mb-6">Contact Us</h5>
            <div className="space-y-4">
              <a href="tel:+254116893804" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
                <Phone className="w-4 h-4 text-white/40 group-hover:text-secondary-container transition-colors" />
                <span className="text-sm font-medium font-sans">+254 116 893 804</span>
              </a>
              <a href="mailto:sales@pinnacleroofing.co.ke" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
                <Mail className="w-4 h-4 text-white/40 group-hover:text-secondary-container transition-colors" />
                <span className="text-sm font-medium font-sans">sales@pinnacleroofing.co.ke</span>
              </a>
            </div>
          </div>

          {/* Expert Help */}
          <div className="md:col-span-3">
            <h5 className="tech-label text-white/40 mb-6">Expert Help</h5>
            <a 
              href="https://wa.me/254116893804" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-whatsapp-green hover:brightness-110 text-white px-6 py-3 rounded-md font-bold text-xs transition-all active:scale-95 shadow-ambient font-sans"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              WhatsApp Consultant
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="tech-label text-white/40">
            © 2024 PINNACLE ROOFING SYSTEMS
          </span>
          <div className="flex gap-8">
            <a href="#" className="tech-label text-white/40 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="tech-label text-white/40 hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


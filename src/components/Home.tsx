import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Building2, Palette, FileText, MessageSquare } from 'lucide-react';
import { ROOFING_PROFILES } from '../constants';

interface HomeProps {
  onStart: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center px-6 max-w-screen-2xl mx-auto pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full py-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 z-10 px-4 md:px-12"
          >
            <div className="inline-block px-3 py-1 bg-surface-container-high text-primary-container rounded-sm tech-label mb-6">
              Architectural Excellence
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-black leading-[1.1] tracking-[-0.02em] mb-8 text-primary-container">
              The <span className="text-secondary-container">Standard</span><br/>of Steel
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed font-sans">
              Precision-engineered roofing solutions for the Kenyan climate. We combine structural integrity with aesthetic elegance to crown your legacy.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onStart}
                className="bg-primary-container text-white px-8 py-4 rounded-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-primary-container/90 active:scale-95 shadow-ambient flex items-center gap-2 group"
              >
                Start Roof Planner
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-primary-container border border-surface-container-high px-8 py-4 rounded-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-surface-container-low active:scale-95">
                Explore Profiles
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative px-4 md:px-0"
          >
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-ambient">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjTr_qPtfmlieewB1Hr9b5EfToLjU8JxPEEpwLp_cAxji2AdET5iQstu3_zzu9bDAzWRkL_x_a5w2Kyc62pxXetzmCHiw5Cs5P-JWsbpcO0PrOqGjjNpXcWlsAMI18alm0zr5zUtDfRtB-5Hy40klYVMOW_5EKmaq36LAsQKmW4lw8DoReHWPf8W0Vg-LCEqPEoOKkLwfcWlFYL4RQzb7ukvZTYEBufXHtIVWhutmGV83Hh4OkyQnznBDUkghF9v7TJdF3AojqBms"
                alt="Modern Kenyan residence"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-12 bg-primary-container p-6 rounded-sm shadow-ambient hidden md:block max-w-[200px]">
              <span className="block text-secondary-container tech-label mb-2">Spec Checked</span>
              <p className="text-white text-sm font-medium leading-tight">ASTM A755/A755M Standard Compliance Certified.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profiles Section */}
      <section className="px-6 max-w-screen-2xl mx-auto py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-headline text-4xl font-extrabold text-primary-container mb-4 tracking-[-0.02em]">Master-Crafted Profiles</h2>
            <p className="text-on-surface-variant max-w-md font-sans">Our expanded range of premium roofing solutions engineered for durability and style.</p>
          </div>
          <div className="h-1 w-24 bg-secondary-container"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROOFING_PROFILES.map((profile, index) => (
            <motion.div 
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-surface-container-lowest p-8 rounded-xl transition-all hover:bg-surface-container-low hover:-translate-y-2 shadow-ambient"
            >
              <div className="aspect-square rounded-lg mb-8 overflow-hidden bg-surface-container-low">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  src={profile.image}
                  alt={profile.title}
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary-container mb-3 tracking-[-0.02em]">{profile.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-sans">{profile.description}</p>
              <div className="flex items-center tech-label text-secondary-container gap-2">
                Details <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-surface-container-low py-32">
        <div className="px-6 max-w-screen-2xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-2/5">
              <h2 className="font-headline text-4xl font-extrabold text-primary-container mb-12 tracking-[-0.02em]">Architectural Control at your Fingertips</h2>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-secondary-container flex items-center justify-center text-white shadow-ambient">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-container mb-2 font-headline text-xl">Precision Measurements</h4>
                    <p className="text-sm text-on-surface-variant font-sans">Input your rafter length and pitch for millimetre-perfect ordering.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-primary-container flex items-center justify-center text-white shadow-ambient">
                    <Palette className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-container mb-2 font-headline text-xl">Live Color Visualization</h4>
                    <p className="text-sm text-on-surface-variant font-sans">See how Charcoal, Brick Red, or Forest Green looks on your specific profile.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-secondary-container flex items-center justify-center text-white shadow-ambient">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-container mb-2 font-headline text-xl">Instant BOM Generation</h4>
                    <p className="text-sm text-on-surface-variant font-sans">Get a full Bill of Materials including ridge caps, valleys, and fasteners.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-3/5 bg-surface-container-lowest rounded-xl p-2 shadow-ambient">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEYsiPgVLuqZdmPD5ODnWyQ0xStyoGX5cz4BHh2vknUw6HgBZmUtjshfrYkWC6gECL793zQi05hWNaVZBgc4KfD_DU3HmNr9dTjRtZQNBY9W_EuiHfBAFaU8dV9YjMGjljgziOpt7c9ptRq2qFqy8KRKgM44eW7265wsafrv5QVfuz8MW1qLjMzzHYcK0UXO9PxJLE_5-2RxJhxLtmboN8YNrvIPB1Z14xAu4LQiboO_Vec7VnO4vI3AJwtEVuZhFcShirzqRGEAU"
                  alt="Roof Planner Preview"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary-container/20 backdrop-blur-[2px] flex items-center justify-center group cursor-pointer">
                  <div className="w-20 h-20 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-ambient group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-container fill-current" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center">
        <h2 className="font-headline text-6xl font-black tracking-[-0.02em] text-primary-container mb-6">Build Your Crown</h2>
        <p className="text-lg text-on-surface-variant mb-12 font-sans">Whether it's a coastal villa or an industrial warehouse, Pinnacle ensures your roof stands as a testament to quality. Consult with our engineers today.</p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <button className="w-full md:w-auto bg-whatsapp-green text-white px-10 py-5 rounded-md font-bold text-sm font-sans flex items-center justify-center gap-3 shadow-ambient transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-[#20bd5a] active:scale-95 group">
            <MessageSquare className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
            Chat with Expert
          </button>
          <button 
            onClick={onStart}
            className="w-full md:w-auto bg-primary-container text-white px-10 py-5 rounded-md font-bold text-sm font-sans transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-primary-container/90 active:scale-95 flex items-center justify-center gap-2 group"
          >
            Launch Planner
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

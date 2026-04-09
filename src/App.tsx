/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProfileSelection } from './components/ProfileSelection';
import { Measurements } from './components/Measurements';
import { Summary } from './components/Summary';
import { RoofingProfile } from './constants';

type Page = 'profiles' | 'measurements' | 'summary';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('profiles');
  const [selectedProfile, setSelectedProfile] = useState<RoofingProfile | null>(null);
  const [measurementData, setMeasurementData] = useState<any>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  };

  const handleProfileSelect = (profile: RoofingProfile) => {
    setSelectedProfile(profile);
    setCurrentPage('measurements');
    window.scrollTo(0, 0);
  };

  const handleMeasurementsComplete = (data: any) => {
    setMeasurementData(data);
    setCurrentPage('summary');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {currentPage === 'profiles' && (
          <ProfileSelection onSelect={handleProfileSelect} />
        )}
        
        {currentPage === 'measurements' && selectedProfile && (
          <Measurements 
            selectedProfile={selectedProfile} 
            onComplete={handleMeasurementsComplete} 
          />
        )}
        
        {currentPage === 'summary' && selectedProfile && measurementData && (
          <Summary 
            profile={selectedProfile} 
            data={measurementData} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
}


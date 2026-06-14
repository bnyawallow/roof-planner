/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StepIndicator } from './components/StepIndicator';
import { ProfileSelection } from './components/ProfileSelection';
import { OptionsSelection } from './components/OptionsSelection';
import { Measurements } from './components/Measurements';
import { Summary } from './components/Summary';
import { RoofingProfile, COLOR_OPTIONS, ColorOption, FINISH_OPTIONS, FinishOption } from './constants';

type Page = 'profiles' | 'options' | 'measurements' | 'summary';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('profiles');
  const [selectedProfile, setSelectedProfile] = useState<RoofingProfile | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLOR_OPTIONS[0]);
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(FINISH_OPTIONS[0]);
  const [measurementData, setMeasurementData] = useState<any>(null);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  }, []);

  const handleProfileSelect = useCallback((profile: RoofingProfile) => {
    setSelectedProfile(profile);
    if (profile.id === 'stone-coated-shingles') {
      setSelectedFinish(FINISH_OPTIONS[0]); // Force matte
    }
    setCurrentPage('options');
    window.scrollTo(0, 0);
  }, []);

  const handleColorSelect = useCallback((color: ColorOption) => {
    setSelectedColor(color);
  }, []);

  const handleMeasurementsComplete = useCallback((data: any) => {
    setMeasurementData(data);
    setCurrentPage('summary');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <StepIndicator 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        selectedProfile={!!selectedProfile}
        selectedColor={!!selectedColor}
        measurementData={!!measurementData}
      />
      
      <main className="flex-grow">
        {currentPage === 'profiles' && (
          <ProfileSelection onSelect={handleProfileSelect} />
        )}

        {currentPage === 'options' && selectedProfile && (
          <OptionsSelection 
            selectedProfile={selectedProfile}
            selectedColor={selectedColor}
            selectedFinish={selectedFinish}
            onColorSelect={handleColorSelect}
            onFinishSelect={setSelectedFinish}
            onNext={() => handleNavigate('measurements')}
            onBack={() => handleNavigate('profiles')}
          />
        )}
        
        {currentPage === 'measurements' && selectedProfile && (
          <Measurements 
            selectedProfile={selectedProfile} 
            selectedColor={selectedColor}
            selectedFinish={selectedFinish}
            onComplete={handleMeasurementsComplete} 
          />
        )}
        
        {currentPage === 'summary' && selectedProfile && measurementData && (
          <Summary 
            profile={selectedProfile} 
            color={selectedColor}
            finish={selectedFinish}
            data={measurementData} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
}


import React from 'react';
import { cn } from '../lib/utils';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentPage: 'profiles' | 'options' | 'measurements' | 'summary';
  onNavigate: (page: string) => void;
  selectedProfile: boolean;
  selectedColor: boolean;
  measurementData: boolean;
}

export const StepIndicator: React.FC<StepIndicatorProps> = React.memo(({ 
  currentPage, 
  onNavigate,
  selectedProfile,
  selectedColor,
  measurementData
}) => {
  const steps = [
    { id: 'profiles', label: 'Profile' },
    { id: 'options', label: 'Options' },
    { id: 'measurements', label: 'Measurements' },
    { id: 'summary', label: 'Summary' },
  ];

  const getStepStatus = (stepId: string, index: number) => {
    if (stepId === currentPage) return 'current';
    
    // Sequentially check completion
    if (stepId === 'profiles') {
      return selectedProfile ? 'completed' : 'upcoming';
    }
    if (stepId === 'options') {
      return (selectedProfile && (currentPage === 'measurements' || currentPage === 'summary' || measurementData)) ? 'completed' : 'upcoming';
    }
    if (stepId === 'measurements') {
      return (selectedProfile && measurementData && currentPage === 'summary') ? 'completed' : 'upcoming';
    }
    
    return 'upcoming';
  };

  return (
    <div className="w-full bg-surface-container-lowest border-b border-surface-container-high mt-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id, index);
          
          // Clickable if completed, or has been reached and unlocked sequentially
          const isClickable = 
            status === 'completed' ||
            step.id === 'profiles' ||
            (step.id === 'options' && selectedProfile) ||
            (step.id === 'measurements' && selectedProfile && (currentPage === 'measurements' || currentPage === 'summary' || measurementData)) ||
            (step.id === 'summary' && selectedProfile && measurementData);

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => isClickable && onNavigate(step.id)}
                className={cn(
                  "flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-full transition-all w-full sm:w-auto",
                  status === 'current' ? "bg-primary-container text-white" : 
                  status === 'completed' ? "bg-secondary-container/10 text-secondary-container hover:bg-secondary-container/20 cursor-pointer" : 
                  isClickable ? "text-on-surface-variant hover:text-primary-container cursor-pointer" :
                  "text-on-surface-variant/50 cursor-default"
                )}
                disabled={!isClickable}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                  status === 'current' ? "bg-white text-primary-container" : 
                  status === 'completed' ? "bg-secondary-container text-white" : 
                  "bg-surface-container-high"
                )}>
                  {status === 'completed' ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span className="font-bold text-xs sm:text-sm">{step.label}</span>
              </button>
              {index < steps.length - 1 && (
                <div className="hidden sm:block w-4 md:w-8 h-px bg-surface-container-high"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
});
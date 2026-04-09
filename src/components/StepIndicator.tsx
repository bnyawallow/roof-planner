import React from 'react';
import { cn } from '../lib/utils';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentPage: 'profiles' | 'measurements' | 'summary';
  onNavigate: (page: string) => void;
  selectedProfile: boolean;
  measurementData: boolean;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentPage, 
  onNavigate,
  selectedProfile,
  measurementData
}) => {
  const steps = [
    { id: 'profiles', label: 'Profile' },
    { id: 'measurements', label: 'Measurements' },
    { id: 'summary', label: 'Summary' },
  ];

  const getStepStatus = (stepId: string, index: number) => {
    if (stepId === currentPage) return 'current';
    
    // Check if step is completed
    const isCompleted = (index === 0 && selectedProfile) || 
                        (index === 1 && measurementData) ||
                        (index === 2 && false); // Summary is last
    
    return isCompleted ? 'completed' : 'upcoming';
  };

  return (
    <div className="w-full bg-surface-container-lowest border-b border-surface-container-high mt-20">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-center gap-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id, index);
          const isClickable = status === 'completed';

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => isClickable && onNavigate(step.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                  status === 'current' ? "bg-primary-container text-white" : 
                  status === 'completed' ? "bg-secondary-container/10 text-secondary-container" : 
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
                <span className="font-bold text-sm">{step.label}</span>
              </button>
              {index < steps.length - 1 && (
                <div className="w-8 h-px bg-surface-container-high"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

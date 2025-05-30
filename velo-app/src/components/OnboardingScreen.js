// eerst scherm, onboarding

'use client';
import { useState } from 'react';
import StepIndicator from './StepIndicator';
import OnboardingStep from './OnboardingStep';

const onboardingSteps = [
  {
    id: 1,
    title: "Welkom bij RideBuddy",
    description: "Ontdek andere fietsers die jouw route en passies delen. Van de eerste swipe tot de eerste gezamenlijke rit - we maken fietsen sociaal!",
    icon: "🚴‍♂️",
    cta: "Laat me zien hoe"
  },
  {
    id: 2,
    title: "Persoonlijke matches",
    description: "Vertel ons over jezelf - je interesses, fietsstijl en wanneer je graag fietst. Zo vinden we de perfecte ritmaatjes voor jou.",
    icon: "🧑",
    cta: "Klinkt goed"
  },
  {
    id: 3,
    title: "Jouw route, jouw keuze",
    description: "Kies je vertrek- en aankomstpunt uit het Velo-netwerk. We tonen je alleen mensen die dezelfde route plannen.",
    icon: "🗺️",
    cta: "Route kiezen"
  },
  {
    id: 4,
    title: "Swipe, Match, Fiets!",
    description: "Swipe door profielen, maak matches en stuur direct een 'Samen fietsen?' uitnodiging. Simpel, sociaal, samen onderweg!",
    icon: "💕",
    cta: "Laten we beginnen!"
  }
];

export default function OnboardingScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-slate-50 flex flex-col font-sans">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="text-2xl font-bold text-orange-600">
          RideBuddy
        </div>
        <button 
          onClick={handleSkip}
          className="text-slate-500 font-medium bg-slate-100 px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors"
        >
          Overslaan
        </button>
      </div>

      {/* Step Indicator */}
      <div className="px-6 mb-4 mt-4">
        <StepIndicator 
          currentStep={currentStep} 
          totalSteps={onboardingSteps.length} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 mx-auto max-w-sm border border-orange-100">
          <OnboardingStep step={onboardingSteps[currentStep]} />
          
          {/* Interactive Preview for Step 4 */}
          {currentStep === 3 && (
            <div className="mt-6 p-4 bg-orange-50 rounded-2xl border border-orange-200">
              <div className="text-center">
                <div className="text-4xl mb-2">👋</div>
                <p className="text-sm text-orange-700 font-medium">
                  &ldquo;Hé Emma! Zin om samen naar het centrum te fietsen? 🚲&rdquo;
                </p>
                <div className="mt-3 flex justify-center space-x-2">
                  <div className="w-16 h-8 bg-orange-200 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-orange-700">Ja! 💕</span>
                  </div>
                  <div className="w-16 h-8 bg-slate-200 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-slate-600">❌</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 flex justify-between items-center bg-white/80 backdrop-blur-sm shadow-sm border-t border-slate-100">
        <button 
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`px-6 py-3 rounded-xl font-medium transition-colors ${
            currentStep === 0 
              ? 'text-slate-400 cursor-not-allowed' 
              : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
          }`}
        >
          Vorige
        </button>

        <div className="flex items-center space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? 'bg-orange-600' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg"
        >
          {onboardingSteps[currentStep].cta || 'Volgende'}
        </button>
      </div>
    </div>
  );
} 
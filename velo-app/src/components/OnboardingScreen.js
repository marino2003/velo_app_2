// eerst scherm, onboarding

'use client';
import { useState } from 'react';
import StepIndicator from './StepIndicator';
import OnboardingStep from './OnboardingStep';

const onboardingSteps = [
  {
    id: 1,
    title: "Welkom bij RideBuddy",
    description: "Fietsen is leuker met gezelschap. Met RideBuddy vind je andere fietsers die jouw route en interesses delen. Maak een profiel aan, kies je route en ontdek wie er met je mee wil trappen!.",
    icon: "🚴‍♂️"
  },
  {
    id: 2,
    title: "Wie ben jij op de fiets?",
    description: "Vertel ons wie je bent, wat je leuk vindt en hoe jij het liefst fietst. Zo vinden we de beste match voor jouw volgende rit.",
    icon: "🧑"
  },
  {
    id: 3,
    title: "Kies je route",
    description: "Kies een vertrekpunt en eindstation. We zoeken fietsmaatjes die dezelfde route plannen.",
    icon: "🗺️"
  },
  {
    id: 4,
    title: "Klaar om te beginnen",
    description: "Tijd om je profiel te maken en je eerste fietsmaatje te vinden!",
    icon: "🎯"
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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-white shadow-sm">
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
      <div className="px-6 mb-8 mt-6">
        <StepIndicator 
          currentStep={currentStep} 
          totalSteps={onboardingSteps.length} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="bg-white rounded-3xl shadow-lg p-8 mx-auto max-w-sm border border-slate-100">
          <OnboardingStep step={onboardingSteps[currentStep]} />
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 flex justify-between items-center bg-white shadow-sm border-t border-slate-100">
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

        <button 
          onClick={handleNext}
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg"
        >
          {currentStep === onboardingSteps.length - 1 ? 'Beginnen' : 'Volgende'}
        </button>
      </div>
    </div>
  );
} 
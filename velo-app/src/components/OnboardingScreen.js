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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col font-sans">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm">
        <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          RideBuddy
        </div>
        <button 
          onClick={handleSkip}
          className="text-slate-500 font-medium bg-orange-50 px-4 py-2 rounded-lg"
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
        <div className="bg-white rounded-2xl shadow-lg p-8 mx-auto max-w-sm border border-orange-100">
          <OnboardingStep step={onboardingSteps[currentStep]} />
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 flex justify-between items-center bg-white/60 backdrop-blur-sm">
        <button 
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`px-6 py-3 rounded-xl font-medium ${
            currentStep === 0 
              ? 'text-slate-400 cursor-not-allowed' 
              : 'text-slate-600 bg-white shadow-sm'
          }`}
        >
          Vorige
        </button>

        <button 
          onClick={handleNext}
          className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg"
        >
          {currentStep === onboardingSteps.length - 1 ? 'Beginnen' : 'Volgende'}
        </button>
      </div>
    </div>
  );
} 
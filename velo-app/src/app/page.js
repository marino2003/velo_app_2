'use client';
import { useState } from 'react';
import OnboardingScreen from '../components/OnboardingScreen';
import ProfileCreationScreen from '../components/ProfileCreationScreen';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('onboarding'); // 'onboarding', 'profile', 'complete'

  const handleOnboardingComplete = () => {
    setCurrentScreen('profile');
  };

  const handleProfileComplete = () => {
    setCurrentScreen('complete');
  };

  if (currentScreen === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  if (currentScreen === 'profile') {
    return <ProfileCreationScreen onComplete={handleProfileComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-6">
      <div className="text-center bg-white rounded-3xl shadow-xl p-10 max-w-sm w-full border border-orange-100">
        <div className="text-6xl mb-6">🚴‍♂️</div>
        <h1 className="text-3xl font-bold mb-3">
          <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Welkom bij RideBuddy!
          </span>
        </h1>
        <p className="text-slate-600 mb-8 text-base leading-relaxed">
          Je profiel is aangemaakt! Je bent nu klaar om te beginnen met het plannen van je fietsroutes en het vinden van fietsmaatjes.
        </p>
        <button 
          onClick={() => setCurrentScreen('onboarding')}
          className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg w-full"
        >
          Onboarding opnieuw bekijken
        </button>
      </div>
    </div>
  );
}

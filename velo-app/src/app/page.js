'use client';
import { useState } from 'react';
import OnboardingScreen from '../components/OnboardingScreen';
import ProfileCreationScreen from '../components/ProfileCreationScreen';
import StationSelectionScreen from '../components/StationSelectionScreen';
import StationDetailScreen from '../components/StationDetailScreen';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('onboarding'); // 'onboarding', 'profile', 'stations', 'station-detail', 'complete'
  const [selectedStations, setSelectedStations] = useState(null);
  const [detailStation, setDetailStation] = useState(null);

  const handleOnboardingComplete = () => {
    setCurrentScreen('profile');
  };

  const handleProfileComplete = () => {
    setCurrentScreen('stations');
  };

  const handleStationsComplete = (stations) => {
    setSelectedStations(stations);
    setCurrentScreen('complete');
  };

  const handleStationDetail = (station) => {
    setDetailStation(station);
    setCurrentScreen('station-detail');
  };

  const handleBackFromDetail = () => {
    setDetailStation(null);
    setCurrentScreen('stations');
  };

  if (currentScreen === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  if (currentScreen === 'profile') {
    return <ProfileCreationScreen onComplete={handleProfileComplete} />;
  }

  if (currentScreen === 'stations') {
    return (
      <StationSelectionScreen 
        onComplete={handleStationsComplete}
        onStationDetail={handleStationDetail}
      />
    );
  }

  if (currentScreen === 'station-detail' && detailStation) {
    return (
      <StationDetailScreen 
        station={detailStation}
        onBack={handleBackFromDetail}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-6">
      <div className="text-center bg-white rounded-3xl shadow-xl p-10 max-w-sm w-full border border-orange-100">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold mb-3">
          <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Route Gepland!
          </span>
        </h1>
        <div className="text-slate-600 mb-8 text-base leading-relaxed">
          <p className="mb-4">Je route is succesvol gepland:</p>
          {selectedStations && (
            <div className="bg-slate-50 rounded-lg p-4 text-left">
              <div className="mb-2">
                <div className="text-sm text-slate-500">Vertrek</div>
                <div className="font-medium text-slate-800">{selectedStations.departure.name}</div>
              </div>
              <div className="flex justify-center my-2">
                <div className="text-orange-500">↓</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Bestemming</div>
                <div className="font-medium text-slate-800">{selectedStations.destination.name}</div>
              </div>
            </div>
          )}
        </div>
        <button 
          onClick={() => setCurrentScreen('onboarding')}
          className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg w-full"
        >
          Nieuwe route plannen
        </button>
      </div>
    </div>
  );
}

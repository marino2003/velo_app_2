'use client';
import { useState } from 'react';
import OnboardingScreen from '../components/OnboardingScreen';
import ProfileCreationScreen from '../components/ProfileCreationScreen';
import StationSelectionScreen from '../components/StationSelectionScreen';
import StationDetailScreen from '../components/StationDetailScreen';
import SwipeScreen from '../components/SwipeScreen';
import MatchesScreen from '../components/MatchesScreen';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('onboarding'); // 'onboarding', 'profile', 'stations', 'station-detail', 'swipe', 'matches'
  const [selectedStations, setSelectedStations] = useState(null);
  const [detailStation, setDetailStation] = useState(null);
  const [matches, setMatches] = useState([]);

  const handleOnboardingComplete = () => {
    setCurrentScreen('profile');
  };

  const handleProfileComplete = () => {
    setCurrentScreen('stations');
  };

  const handleStationsComplete = (stations) => {
    setSelectedStations(stations);
    setCurrentScreen('swipe');
  };

  const handleStationDetail = (station) => {
    setDetailStation(station);
    setCurrentScreen('station-detail');
  };

  const handleBackFromDetail = () => {
    setDetailStation(null);
    setCurrentScreen('stations');
  };

  const handleSwipeComplete = (foundMatches) => {
    setMatches(foundMatches);
    setCurrentScreen('matches');
  };

  const handleNewRoute = () => {
    // Reset alles en begin opnieuw
    setSelectedStations(null);
    setMatches([]);
    setDetailStation(null);
    setCurrentScreen('onboarding');
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

  if (currentScreen === 'swipe' && selectedStations) {
    return (
      <SwipeScreen 
        route={selectedStations}
        onComplete={handleSwipeComplete}
      />
    );
  }

  if (currentScreen === 'matches') {
    return (
      <MatchesScreen 
        matches={matches}
        route={selectedStations}
        onNewRoute={handleNewRoute}
      />
    );
  }

  // Fallback (zou niet moeten gebeuren)
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-6">
      <div className="text-center bg-white rounded-3xl shadow-xl p-10 max-w-sm w-full border border-orange-100">
        <div className="text-6xl mb-6">🔄</div>
        <h1 className="text-2xl font-bold mb-3 text-slate-800">Iets ging fout</h1>
        <p className="text-slate-600 mb-6">Er is een probleem opgetreden.</p>
        <button 
          onClick={handleNewRoute}
          className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg w-full"
        >
          Opnieuw beginnen
        </button>
      </div>
    </div>
  );
}

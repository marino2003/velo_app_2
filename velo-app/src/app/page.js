'use client';
import { useState } from 'react';
import OnboardingScreen from '../components/OnboardingScreen';
import ProfileCreationScreen from '../components/ProfileCreationScreen';
import StationSelectionScreen from '../components/StationSelectionScreen';
import StationDetailScreen from '../components/StationDetailScreen';
import SwipeScreen from '../components/SwipeScreen';
import MatchesScreen from '../components/MatchesScreen';
import NavigationBar from '../components/NavigationBar';

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

  // Nieuwe navigatie handler
  const handleNavigate = (screenId) => {
    setCurrentScreen(screenId);
  };

  // Wrapper functie om padding toe te voegen voor navigatie
  const ScreenWrapper = ({ children }) => {
    const shouldShowNav = currentScreen !== 'onboarding' && currentScreen !== 'station-detail';
    return (
      <div className={shouldShowNav ? 'pb-20' : ''}>
        {children}
      </div>
    );
  };

  if (currentScreen === 'onboarding') {
    return (
      <>
        <ScreenWrapper>
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        </ScreenWrapper>
        <NavigationBar 
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          matches={matches}
          selectedStations={selectedStations}
        />
      </>
    );
  }

  if (currentScreen === 'profile') {
    return (
      <>
        <ScreenWrapper>
          <ProfileCreationScreen onComplete={handleProfileComplete} />
        </ScreenWrapper>
        <NavigationBar 
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          matches={matches}
          selectedStations={selectedStations}
        />
      </>
    );
  }

  if (currentScreen === 'stations') {
    return (
      <>
        <ScreenWrapper>
          <StationSelectionScreen 
            onComplete={handleStationsComplete}
            onStationDetail={handleStationDetail}
          />
        </ScreenWrapper>
        <NavigationBar 
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          matches={matches}
          selectedStations={selectedStations}
        />
      </>
    );
  }

  if (currentScreen === 'station-detail' && detailStation) {
    return (
      <>
        <ScreenWrapper>
          <StationDetailScreen 
            station={detailStation}
            onBack={handleBackFromDetail}
          />
        </ScreenWrapper>
        <NavigationBar 
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          matches={matches}
          selectedStations={selectedStations}
        />
      </>
    );
  }

  if (currentScreen === 'swipe' && selectedStations) {
    return (
      <>
        <ScreenWrapper>
          <SwipeScreen 
            route={selectedStations}
            onComplete={handleSwipeComplete}
          />
        </ScreenWrapper>
        <NavigationBar 
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          matches={matches}
          selectedStations={selectedStations}
        />
      </>
    );
  }

  if (currentScreen === 'matches') {
    return (
      <>
        <ScreenWrapper>
          <MatchesScreen 
            matches={matches}
            route={selectedStations}
            onNewRoute={handleNewRoute}
            onNavigate={handleNavigate}
          />
        </ScreenWrapper>
        <NavigationBar 
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          matches={matches}
          selectedStations={selectedStations}
        />
      </>
    );
  }

  // Fallback (zou niet moeten gebeuren)
  return (
    <>
      <ScreenWrapper>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="text-center bg-white rounded-3xl shadow-lg p-10 max-w-sm w-full border border-slate-100">
            <div className="text-6xl mb-6">🔄</div>
            <h1 className="text-2xl font-bold mb-3 text-slate-800">Iets ging fout</h1>
            <p className="text-slate-600 mb-6">Er is een probleem opgetreden.</p>
            <div className="flex justify-center">
              <button 
                onClick={handleNewRoute}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-medium shadow-lg transition-colors"
              >
                Opnieuw beginnen
              </button>
            </div>
          </div>
        </div>
      </ScreenWrapper>
      <NavigationBar 
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        matches={matches}
        selectedStations={selectedStations}
      />
    </>
  );
}

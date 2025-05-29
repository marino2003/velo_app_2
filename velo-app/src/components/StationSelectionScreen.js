'use client';
import { useState, useEffect } from 'react';
import { getTargetStations } from '../services/cityBikesApi';

export default function StationSelectionScreen({ onComplete, onStationDetail }) {
  const [loading, setLoading] = useState(true);
  const [stations, setStations] = useState([]);
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [currentStep, setCurrentStep] = useState('departure'); // 'departure' or 'destination'
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTargetStations();
  }, []);

  const loadTargetStations = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Searching for specific target stations...');
      
      const targetStations = await getTargetStations();
      
      if (targetStations.length === 0) {
        throw new Error('De gewenste stations (Antwerpen-Centraal, Opera, Groenplaats) zijn niet beschikbaar in de CityBikes API. Deze stations worden momenteel niet ondersteund in de database.');
      }
      
      setStations(targetStations);
      console.log('Target stations loaded:', targetStations.length);
      console.log('Found stations:', targetStations.map(s => `${s.name} (matches: ${s.targetName})`));
      
    } catch (err) {
      console.error('Error loading target stations:', err);
      setError(`${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStationSelect = (station) => {
    if (currentStep === 'departure') {
      setSelectedDeparture(station);
      setCurrentStep('destination');
    } else {
      setSelectedDestination(station);
    }
  };

  const handleBack = () => {
    if (currentStep === 'destination') {
      setCurrentStep('departure');
      setSelectedDestination(null);
    }
  };

  const handleComplete = () => {
    if (selectedDeparture && selectedDestination) {
      onComplete({
        departure: selectedDeparture,
        destination: selectedDestination
      });
    }
  };

  const getAvailableStations = () => {
    if (currentStep === 'destination') {
      // Filter out the selected departure station
      return stations.filter(station => station.id !== selectedDeparture?.id);
    }
    return stations;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚴‍♂️</div>
          <p className="text-slate-600">Zoeken naar specifieke stations...</p>
          <p className="text-xs text-slate-500 mt-2">Antwerpen-Centraal, Opera, Groenplaats</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-6">
        <div className="text-center bg-white rounded-3xl shadow-xl p-10 max-w-sm w-full border border-orange-100">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-2xl font-bold mb-3 text-slate-800">Fout</h1>
          <p className="text-slate-600 mb-8">{error}</p>
          <button 
            onClick={loadTargetStations}
            className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg w-full"
          >
            Opnieuw proberen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col font-sans">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm">
        <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          RideBuddy
        </div>
        <div className="text-sm text-slate-500 bg-orange-50 px-3 py-1 rounded-lg">
          {currentStep === 'departure' ? 'Vertrekstation' : 'Eindstation'}
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            selectedDeparture ? 'bg-green-500 text-white' : 
            currentStep === 'departure' ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-400'
          }`}>
            1
          </div>
          <div className="flex-1 h-2 bg-slate-200 rounded">
            <div className={`h-full rounded transition-all ${
              selectedDeparture ? 'bg-green-500 w-full' : 'bg-orange-500 w-1/2'
            }`}></div>
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            selectedDestination ? 'bg-green-500 text-white' : 
            currentStep === 'destination' ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-400'
          }`}>
            2
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-slate-600">
          <span>Vertrekstation</span>
          <span>Eindstation</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">
              {currentStep === 'departure' ? '🚀' : '🎯'}
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              {currentStep === 'departure' ? 'Kies je vertrekstation' : 'Kies je eindstation'}
            </h1>
            <p className="text-slate-600">
              {currentStep === 'departure' 
                ? 'Waar wil je starten met fietsen?' 
                : 'Waar wil je eindigen?'
              }
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Specifieke Antwerpen stations - Live data van CityBikes API
            </p>
          </div>

          {/* Gekozen stations overzicht */}
          {(selectedDeparture || selectedDestination) && (
            <div className="mb-6 space-y-3">
              {selectedDeparture && (
                <div className="p-4 bg-white rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">Vertrekstation</p>
                      <p className="font-medium text-slate-800">{selectedDeparture.name}</p>
                    </div>
                    <span className="text-xl">🚀</span>
                  </div>
                </div>
              )}
              
              {selectedDestination && (
                <div className="p-4 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">Eindstation</p>
                      <p className="font-medium text-slate-800">{selectedDestination.name}</p>
                    </div>
                    <span className="text-xl">🎯</span>
                  </div>
                </div>
              )}
              
              {selectedDeparture && selectedDestination && (
                <div className="text-center py-2">
                  <div className="inline-flex items-center space-x-2 text-sm text-slate-600 bg-orange-50 px-4 py-2 rounded-lg">
                    <span>✓</span>
                    <span>Route compleet! Klik op &apos;Doorgaan&apos;</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stations List */}
          <div className="space-y-3">
            {getAvailableStations().map((station) => (
              <div
                key={station.id}
                className="bg-white rounded-lg p-4 shadow-sm border border-orange-100"
              >
                <div className="flex justify-between items-start">
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => handleStationSelect(station)}
                  >
                    <h3 className="font-medium text-slate-800 mb-1">{station.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <div className="flex items-center space-x-1">
                        <span className="text-green-600">🚴</span>
                        <span>{station.free_bikes || 0} fietsen</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-blue-600">🅿️</span>
                        <span>{station.empty_slots || 0} plaatsen</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStationDetail?.(station);
                      }}
                      className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      Details
                    </button>
                    <div 
                      className="text-orange-500 cursor-pointer"
                      onClick={() => handleStationSelect(station)}
                    >
                      →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="p-6 bg-white/60 backdrop-blur-sm">
        <div className="flex space-x-4">
          {currentStep === 'destination' && (
            <button
              onClick={handleBack}
              className="flex-1 py-3 px-6 border border-slate-300 text-slate-600 rounded-xl font-medium"
            >
              Terug
            </button>
          )}
          
          {selectedDestination && (
            <button
              onClick={handleComplete}
              className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg"
            >
              Doorgaan
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 
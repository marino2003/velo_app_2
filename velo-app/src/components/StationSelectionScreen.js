'use client';
import { useState, useEffect } from 'react';
import { getNetworksByCity, getNetworkStations } from '../services/cityBikesApi';

export default function StationSelectionScreen({ onComplete }) {
  const [loading, setLoading] = useState(true);
  const [stations, setStations] = useState([]);
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [currentStep, setCurrentStep] = useState('departure'); // 'departure' or 'destination'
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAntwerpStations();
  }, []);

  const loadAntwerpStations = async () => {
    try {
      setLoading(true);
      setError(null);

      // Find networks in Antwerp
      const networks = await getNetworksByCity('antwerp');
      console.log('Antwerp networks found:', networks);

      if (networks.length === 0) {
        // Try alternative names for Antwerp
        const alternativeNetworks = await getNetworksByCity('antwerpen');
        if (alternativeNetworks.length === 0) {
          throw new Error('Geen bike sharing netwerken gevonden in Antwerpen');
        }
        networks.push(...alternativeNetworks);
      }

      // Get stations for the first available network
      const networkId = networks[0].id;
      const stationsData = await getNetworkStations(networkId);
      
      setStations(stationsData);
      console.log('Stations loaded:', stationsData.length);
    } catch (err) {
      console.error('Error loading stations:', err);
      setError(err.message);
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
          <p className="text-slate-600">Stations laden...</p>
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
            onClick={loadAntwerpStations}
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
          </div>

          {/* Selected stations summary */}
          {selectedDeparture && (
            <div className="mb-6 p-4 bg-white rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-slate-500">Vertrek</p>
                  <p className="font-medium text-slate-800">{selectedDeparture.name}</p>
                </div>
              </div>
            </div>
          )}

          {/* Stations List */}
          <div className="space-y-3">
            {getAvailableStations().map((station) => (
              <div
                key={station.id}
                onClick={() => handleStationSelect(station)}
                className="bg-white rounded-lg p-4 shadow-sm border border-orange-100 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
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
                  <div className="text-orange-500">
                    →
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
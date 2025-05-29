'use client';
import { useState, useEffect } from 'react';

export default function StationDetailScreen({ station, onBack }) {
  const [refreshTime, setRefreshTime] = useState(new Date());

  useEffect(() => {
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      setRefreshTime(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (available, total) => {
    const percentage = total > 0 ? (available / total) * 100 : 0;
    if (percentage >= 50) return 'text-green-600';
    if (percentage >= 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusText = (bikes, slots) => {
    const total = bikes + slots;
    if (total === 0) return 'Buiten dienst';
    if (bikes === 0) return 'Geen fietsen beschikbaar';
    if (slots === 0) return 'Geen plaatsen beschikbaar';
    return 'Beschikbaar';
  };

  const bikesAvailable = station.free_bikes || 0;
  const slotsAvailable = station.empty_slots || 0;
  const totalCapacity = bikesAvailable + slotsAvailable;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col font-sans">
      {/* Header */}
      <div className="flex items-center p-6 bg-white/80 backdrop-blur-sm">
        <button 
          onClick={onBack}
          className="mr-4 p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          ← Terug
        </button>
        <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          RideBuddy
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-md mx-auto">
          
          {/* Station Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🚉</div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              {station.name}
            </h1>
            <p className="text-slate-600">
              Station Details
            </p>
          </div>

          {/* Status Overview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 mb-6">
            <div className="text-center mb-4">
              <div className={`text-2xl font-bold ${getStatusColor(bikesAvailable, totalCapacity)}`}>
                {getStatusText(bikesAvailable, slotsAvailable)}
              </div>
            </div>
            
            {/* Visual Status Bar */}
            <div className="mb-4">
              <div className="flex rounded-lg overflow-hidden h-4 bg-slate-200">
                <div 
                  className="bg-green-500"
                  style={{ width: totalCapacity > 0 ? `${(bikesAvailable / totalCapacity) * 100}%` : '0%' }}
                ></div>
                <div 
                  className="bg-blue-500"
                  style={{ width: totalCapacity > 0 ? `${(slotsAvailable / totalCapacity) * 100}%` : '0%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Fietsen beschikbaar</span>
                <span>Plaatsen beschikbaar</span>
              </div>
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="space-y-4">
            
            {/* Available Bikes */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🚴</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">Beschikbare Fietsen</h3>
                    <p className="text-sm text-slate-600">Klaar om te gebruiken</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {bikesAvailable}
                  </div>
                  <div className="text-sm text-slate-500">fietsen</div>
                </div>
              </div>
            </div>

            {/* Available Slots */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🅿️</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">Beschikbare Plaatsen</h3>
                    <p className="text-sm text-slate-600">Voor het terugbrengen</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {slotsAvailable}
                  </div>
                  <div className="text-sm text-slate-500">plaatsen</div>
                </div>
              </div>
            </div>

            {/* Total Capacity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">Totale Capaciteit</h3>
                    <p className="text-sm text-slate-600">Maximum aantal fietsen</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600">
                    {totalCapacity}
                  </div>
                  <div className="text-sm text-slate-500">totaal</div>
                </div>
              </div>
            </div>

            {/* Location Info */}
            {(station.latitude && station.longitude) && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">Locatie</h3>
                    <p className="text-sm text-slate-600">GPS coördinaten</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Lat:</span>
                      <div className="font-mono text-slate-700">{station.latitude.toFixed(6)}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Lng:</span>
                      <div className="font-mono text-slate-700">{station.longitude.toFixed(6)}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Last Updated */}
          <div className="text-center mt-6 text-sm text-slate-500">
            Laatste update: {refreshTime.toLocaleTimeString('nl-NL')}
          </div>

        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 bg-white/60 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-4 rounded-xl font-medium shadow-lg"
        >
          Terug naar stations
        </button>
      </div>
    </div>
  );
} 
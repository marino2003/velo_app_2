'use client';
import { useState } from 'react';

export default function MatchesScreen({ matches, route, onNewRoute }) {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [notes, setNotes] = useState({});

  const handleNoteChange = (matchId, note) => {
    setNotes(prev => ({
      ...prev,
      [matchId]: note
    }));
  };

  const sendGreeting = (match) => {
    alert(`Groet verstuurd naar ${match.name}! 👋`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col font-sans">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm">
        <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          Mijn Ritmaatjes
        </div>
        <div className="text-sm text-slate-500 bg-orange-50 px-3 py-1 rounded-lg">
          {matches.length} match{matches.length !== 1 ? 'es' : ''}
        </div>
      </div>

      {/* Route Info */}
      <div className="px-6 py-4 bg-white/60">
        <div className="text-center">
          <p className="text-sm text-slate-600 mb-2">Jouw geplande route:</p>
          <p className="font-medium text-slate-800">
            {route.departure.name} → {route.destination.name}
          </p>
        </div>
      </div>

      {/* Matches List */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-4">
          
          {matches.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😔</div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Geen matches</h2>
              <p className="text-slate-600">Je hebt nog geen ritmaatjes gevonden.</p>
            </div>
          ) : (
            matches.map((match) => (
              <div
                key={match.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-orange-100"
              >
                {/* Match Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-4xl">{match.avatar}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800">{match.name}, {match.age}</h3>
                    <p className="text-sm text-slate-600">{match.cyclingStyle} • {match.timeSlot}</p>
                  </div>
                  <div className="text-2xl">💕</div>
                </div>

                {/* Bio */}
                <div className="mb-4">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {match.bio}
                  </p>
                </div>

                {/* Shared Interests */}
                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-2">Interesses:</p>
                  <div className="flex flex-wrap gap-1">
                    {match.interests.map((interest, index) => (
                      <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Personal Note */}
                <div className="mb-4">
                  <label className="text-xs text-slate-500 block mb-2">Persoonlijke notitie:</label>
                  <textarea
                    value={notes[match.id] || ''}
                    onChange={(e) => handleNoteChange(match.id, e.target.value)}
                    placeholder="Voeg een notitie toe over deze ritmaatje..."
                    className="w-full text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3 resize-none"
                    rows="2"
                  />
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => sendGreeting(match)}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white py-2 px-4 rounded-lg text-sm font-medium"
                  >
                    Stuur groet 👋
                  </button>
                  <button
                    onClick={() => setSelectedMatch(selectedMatch === match.id ? null : match.id)}
                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm"
                  >
                    {selectedMatch === match.id ? 'Minder' : 'Meer'}
                  </button>
                </div>

                {/* Extended Info */}
                {selectedMatch === match.id && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Fietsstijl:</span>
                        <span className="text-slate-700">{match.cyclingStyle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Voorkeurstijd:</span>
                        <span className="text-slate-700">{match.timeSlot}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Match datum:</span>
                        <span className="text-slate-700">{new Date().toLocaleDateString('nl-NL')}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 bg-white/60 backdrop-blur-sm space-y-3">
        {matches.length > 0 && (
          <div className="text-center mb-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-700">
                🎉 Super! Je hebt {matches.length} potentiële ritmaatje{matches.length !== 1 ? 's' : ''} gevonden voor je route.
              </p>
            </div>
          </div>
        )}
        
        <button
          onClick={onNewRoute}
          className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-4 rounded-xl font-medium shadow-lg"
        >
          Plan nieuwe route
        </button>
      </div>
    </div>
  );
} 
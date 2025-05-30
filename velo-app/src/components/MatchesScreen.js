'use client';
import { useState } from 'react';

export default function MatchesScreen({ matches, route, onNewRoute, onNavigate }) {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [notes, setNotes] = useState({});
  const [invitesSent, setInvitesSent] = useState(new Set());
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [currentInvite, setCurrentInvite] = useState(null);

  const handleNoteChange = (matchId, note) => {
    setNotes(prev => ({
      ...prev,
      [matchId]: note
    }));
  };

  const sendGreeting = (match) => {
    alert(`Groet verstuurd naar ${match.name}! 👋`);
  };

  const sendCyclingInvite = (match) => {
    setCurrentInvite(match);
    setShowInviteModal(true);
  };

  const confirmInvite = () => {
    if (currentInvite) {
      setInvitesSent(prev => new Set([...prev, currentInvite.id]));
      setShowInviteModal(false);
      setCurrentInvite(null);
    }
  };

  const closeModal = () => {
    setShowInviteModal(false);
    setCurrentInvite(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-white shadow-sm">
        <div className="text-2xl font-bold text-orange-600">
          Mijn Ritmaatjes
        </div>
        <div className="text-sm bg-slate-100 text-slate-600 px-3 py-1 rounded-xl">
          {matches.length} match{matches.length !== 1 ? 'es' : ''}
        </div>
      </div>

      {/* Route Info */}
      <div className="px-6 py-4 bg-white border-b border-slate-100">
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
            <div className="text-center py-12 bg-white rounded-3xl shadow-lg border border-slate-100">
              <div className="text-6xl mb-4">🚴‍♂️</div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Nog geen ritmaatjes</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Begin met swipen om mensen te vinden die jouw route en interesses delen. 
                Iedere match brengt je dichter bij je volgende gezamenlijke fietsrit!
              </p>
              <button
                onClick={() => onNavigate && onNavigate('swipe')}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg"
              >
                Start met swipen 💕
              </button>
            </div>
          ) : (
            <>
              {/* Success message */}
              <div className="text-center mb-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="text-3xl mb-2">🎉</div>
                  <h2 className="text-lg font-bold text-green-800 mb-1">
                    Super! Je hebt {matches.length} ritmaatje{matches.length !== 1 ? 's' : ''} gevonden
                  </h2>
                  <p className="text-sm text-green-700">
                    Stuur een &ldquo;Samen fietsen?&rdquo; uitnodiging om je volgende rit te plannen
                  </p>
                </div>
              </div>

              {matches.map((match) => (
                <div
                  key={match.id}
                  className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100"
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
                        <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg border border-green-200">
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
                      className="w-full text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-3 resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                      rows="2"
                    />
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    {/* Primary Actions Row */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => sendGreeting(match)}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-xl text-sm font-medium transition-colors"
                      >
                        <span className="hidden sm:inline">Stuur groet 👋</span>
                        <span className="sm:hidden">Groet 👋</span>
                      </button>
                      <button
                        onClick={() => sendCyclingInvite(match)}
                        disabled={invitesSent.has(match.id)}
                        className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
                          invitesSent.has(match.id)
                            ? 'bg-green-100 text-green-700 border border-green-200 cursor-not-allowed'
                            : 'bg-orange-600 hover:bg-orange-700 text-white'
                        }`}
                      >
                        {invitesSent.has(match.id) ? (
                          <span>
                            <span className="hidden sm:inline">Uitgenodigd! ✓</span>
                            <span className="sm:hidden">Uitgenodigd ✓</span>
                          </span>
                        ) : (
                          <span>
                            <span className="hidden sm:inline">Samen fietsen? 🚴‍♂️</span>
                            <span className="sm:hidden">Samen? 🚴‍♂️</span>
                          </span>
                        )}
                      </button>
                    </div>
                    
                    {/* Secondary Action */}
                    <div className="flex justify-center">
                      <button
                        onClick={() => setSelectedMatch(selectedMatch === match.id ? null : match.id)}
                        className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm transition-colors"
                      >
                        {selectedMatch === match.id ? 'Minder info' : 'Meer info'}
                      </button>
                    </div>
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
              ))}
            </>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 bg-white shadow-sm border-t border-slate-100 space-y-3">
        <div className="flex justify-center space-x-3">
          <button
            onClick={onNewRoute}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-6 rounded-xl font-medium transition-colors"
          >
            Nieuwe route
          </button>
          {matches.length === 0 && (
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-xl font-medium shadow-lg transition-colors"
            >
              Meer mensen zoeken
            </button>
          )}
        </div>
      </div>

      {/* Custom Invite Modal */}
      {showInviteModal && currentInvite && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100">
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🚴‍♂️</div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Samen fietsen?</h2>
              <p className="text-slate-600 text-sm">Je staat op het punt om een uitnodiging te versturen naar:</p>
            </div>

            {/* Match Info */}
            <div className="bg-slate-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-3xl">{currentInvite.avatar}</div>
                <div>
                  <h3 className="font-bold text-slate-800">{currentInvite.name}</h3>
                  <p className="text-sm text-slate-600">{currentInvite.cyclingStyle}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {currentInvite.interests.slice(0, 3).map((interest, index) => (
                  <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Message Preview */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6">
              <p className="text-sm text-orange-800 leading-relaxed">
                <strong>&ldquo;{currentInvite.name}! 👋</strong><br/>
                Ik zie dat we dezelfde route plannen van <strong>{route.departure.name}</strong> naar <strong>{route.destination.name}</strong>. 
                Zin om samen te fietsen? Kunnen we onderweg praten over onze gedeelde interesses! 🚲✨&rdquo;
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={closeModal}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-medium transition-colors"
              >
                Annuleren
              </button>
              <button
                onClick={confirmInvite}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-xl font-medium transition-colors shadow-lg"
              >
                Verstuur uitnodiging
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
'use client';
import { useState, useEffect } from 'react';

// Dummy fietsers data - in echte app zou dit van een API komen
const DUMMY_CYCLISTS = [
  {
    id: 1,
    name: 'Emma',
    age: 24,
    interests: ['Fotografie', 'Koffie', 'Natuur'],
    cyclingStyle: 'Ontspannen',
    timeSlot: 'Ochtend',
    avatar: '👩‍🦰',
    bio: 'Hou van rustige fietstochten door de stad. Altijd op zoek naar nieuwe koffieplekjes!'
  },
  {
    id: 2,
    name: 'Lucas',
    age: 28,
    interests: ['Sport', 'Muziek', 'Reizen'],
    cyclingStyle: 'Sportief',
    timeSlot: 'Middag',
    avatar: '👨‍🦱',
    bio: 'Sportieve fietser die graag nieuwe routes ontdekt. Muziek in mijn oren en wind door mijn haar!'
  },
  {
    id: 3,
    name: 'Sophie',
    age: 22,
    interests: ['Kunst', 'Lezen', 'Koffie'],
    cyclingStyle: 'Ontspannen',
    timeSlot: 'Avond',
    avatar: '👩‍🎨',
    bio: 'Creatieve ziel die fietsen combineert met kunst. Fiets graag langs galleries en boekwinkels.'
  },
  {
    id: 4,
    name: 'Maxim',
    age: 26,
    interests: ['Technologie', 'Sport', 'Natuur'],
    cyclingStyle: 'Sportief',
    timeSlot: 'Ochtend',
    avatar: '👨‍💻',
    bio: 'Tech lover die de balans zoekt tussen schermtijd en buitentijd. Fietsen is mijn ontsnapping!'
  },
  {
    id: 5,
    name: 'Lisa',
    age: 25,
    interests: ['Natuur', 'Fotografie', 'Reizen'],
    cyclingStyle: 'Gemiddeld',
    timeSlot: 'Middag',
    avatar: '👩‍🌾',
    bio: 'Natuurliefhebber die de mooiste plekjes vastlegt. Samen fietsen is samen avonturen beleven!'
  }
];

export default function SwipeScreen({ route, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState('');
  const [showMatch, setShowMatch] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(null);

  const currentCyclist = DUMMY_CYCLISTS[currentIndex];

  const handleSwipe = (direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSwipeDirection(direction);

    // Als het een like is (swipe right), maak een match
    if (direction === 'right') {
      const newMatch = currentCyclist;
      setMatches(prev => [...prev, newMatch]);
      setCurrentMatch(newMatch);
      
      // Toon match animatie
      setTimeout(() => {
        setShowMatch(true);
      }, 300);
    }

    // Ga naar volgende persoon
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
      setSwipeDirection('');
    }, 600);
  };

  const handleMatchClose = () => {
    setShowMatch(false);
    setCurrentMatch(null);
  };

  const handleComplete = () => {
    onComplete(matches);
  };

  // Als alle personen zijn doorlopen
  if (currentIndex >= DUMMY_CYCLISTS.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-6">
        <div className="text-center bg-white rounded-3xl shadow-xl p-10 max-w-sm w-full border border-orange-100">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-2xl font-bold mb-3 text-slate-800">Klaar met swipen!</h1>
          <p className="text-slate-600 mb-6">
            Je hebt {matches.length} match{matches.length !== 1 ? 'es' : ''} gemaakt
          </p>
          
          {matches.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {matches.map((match) => (
                  <div key={match.id} className="bg-green-100 px-3 py-1 rounded-full">
                    <span className="text-lg">{match.avatar}</span>
                    <span className="text-sm ml-1">{match.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleComplete}
            className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg w-full"
          >
            Bekijk mijn ritmaatjes
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
          {currentIndex + 1} / {DUMMY_CYCLISTS.length}
        </div>
      </div>

      {/* Route info */}
      <div className="px-6 py-4 bg-white/60">
        <div className="text-center">
          <p className="text-sm text-slate-600">
            Zoekt ritmaatjes voor: <span className="font-medium">{route.departure.name}</span> → <span className="font-medium">{route.destination.name}</span>
          </p>
        </div>
      </div>

      {/* Swipe Card */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="relative w-full max-w-sm">
          
          {/* Card */}
          <div className={`bg-white rounded-3xl shadow-2xl border border-orange-100 transform transition-all duration-600 ${
            isAnimating ? (swipeDirection === 'left' ? '-translate-x-full rotate-12' : 'translate-x-full rotate-12') : ''
          } ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            
            {/* Avatar */}
            <div className="text-center pt-8 pb-4">
              <div className="text-8xl mb-4">{currentCyclist.avatar}</div>
              <h2 className="text-2xl font-bold text-slate-800">{currentCyclist.name}, {currentCyclist.age}</h2>
            </div>

            {/* Info */}
            <div className="px-6 pb-6">
              <div className="mb-4">
                <p className="text-slate-600 text-sm leading-relaxed">
                  {currentCyclist.bio}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🚴</span>
                  <span className="text-sm text-slate-600">{currentCyclist.cyclingStyle} fietser</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">⏰</span>
                  <span className="text-sm text-slate-600">Fietst graag in de {currentCyclist.timeSlot.toLowerCase()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">💫</span>
                  <div className="flex flex-wrap gap-1">
                    {currentCyclist.interests.map((interest, index) => (
                      <span key={index} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Buttons */}
      <div className="p-6 bg-white/60 backdrop-blur-sm">
        <div className="flex justify-center space-x-8">
          <button
            onClick={() => handleSwipe('left')}
            disabled={isAnimating}
            className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl disabled:opacity-50"
          >
            ✕
          </button>
          <button
            onClick={() => handleSwipe('right')}
            disabled={isAnimating}
            className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl disabled:opacity-50"
          >
            ♡
          </button>
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>Skip</span>
          <span>Like</span>
        </div>
      </div>

      {/* Match Popup */}
      {showMatch && currentMatch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl p-8 text-center max-w-sm w-full">
            <div className="text-6xl mb-4">💕</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Het is een match!</h2>
            <p className="text-slate-600 mb-6">
              Jij en {currentMatch.name} gaan samen fietsen!
            </p>
            <div className="flex justify-center space-x-4 mb-6">
              <div className="text-4xl">{currentMatch.avatar}</div>
              <div className="text-4xl">🚴‍♂️</div>
            </div>
            <button
              onClick={handleMatchClose}
              className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-3 rounded-xl font-medium w-full"
            >
              Doorgaan met swipen
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 
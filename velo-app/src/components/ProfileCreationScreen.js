'use client';
import { useState } from 'react';

export default function ProfileCreationScreen({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    interests: [],
    cyclingStyle: ''
  });

  const interestOptions = [
    { id: 'natuur', label: 'Natuur', icon: '🌳' },
    { id: 'sport', label: 'Sport', icon: '💪' },
    { id: 'fotografie', label: 'Fotografie', icon: '📸' },
    { id: 'geschiedenis', label: 'Geschiedenis', icon: '🏛️' },
    { id: 'eten', label: 'Eten & Drinken', icon: '🍽️' },
    { id: 'cultuur', label: 'Cultuur', icon: '🎭' },
    { id: 'architectuur', label: 'Architectuur', icon: '🏗️' },
    { id: 'muziek', label: 'Muziek', icon: '🎵' }
  ];

  const cyclingStyles = [
    { id: 'ontspannen', label: 'Ontspannen', description: 'Rustig tempo, genieten van de omgeving' },
    { id: 'sportief', label: 'Sportief', description: 'Stevig tempo, goede conditie' },
    { id: 'toerisme', label: 'Toerisme', description: 'Veel stops, bezienswaardigheden bekijken' },
    { id: 'pendelen', label: 'Pendelen', description: 'Efficiënt van A naar B' }
  ];

  const handleInputChange = (field, value) => {
    console.log(`Updating ${field}:`, value); // Debug log
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestToggle = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.age && formData.cyclingStyle) {
      console.log('Profile data:', formData);
      onComplete();
    }
  };

  const isFormValid = formData.name && formData.age && formData.cyclingStyle;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col font-sans">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm">
        <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          RideBuddy
        </div>
        <div className="text-sm text-slate-500 bg-orange-50 px-3 py-1 rounded-lg">
          Profiel aanmaken
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🧑‍💼</div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              Vertel ons over jezelf
            </h1>
            <p className="text-slate-600">
              Maak je profiel aan zodat we de perfecte fietsmaatjes voor je kunnen vinden.
            </p>
          </div>

          <div className="space-y-6">
            {/* Naam */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Naam
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  console.log('Name input change:', e.target.value);
                  setFormData(prev => ({ ...prev, name: e.target.value }));
                }}
                placeholder="Voer je naam in"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-900"
              />
            </div>

            {/* Leeftijd */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Leeftijd
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => {
                  console.log('Age input change:', e.target.value);
                  setFormData(prev => ({ ...prev, age: e.target.value }));
                }}
                placeholder="Voer je leeftijd in"
                min="16"
                max="99"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-900"
              />
            </div>

            {/* Interesses */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
              <label className="block text-sm font-medium text-slate-700 mb-4">
                Interesses (optioneel)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {interestOptions.map((interest) => (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => handleInterestToggle(interest.id)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      formData.interests.includes(interest.id)
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-lg mb-1">{interest.icon}</div>
                    {interest.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fietsstijl */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
              <label className="block text-sm font-medium text-slate-700 mb-4">
                Jouw fietsstijl
              </label>
              <div className="space-y-3">
                {cyclingStyles.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => handleInputChange('cyclingStyle', style.id)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      formData.cyclingStyle === style.id
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-medium mb-1">{style.label}</div>
                    <div className="text-sm opacity-80">{style.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`w-full py-4 rounded-xl font-medium shadow-lg transition-all ${
                  isFormValid
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Profiel aanmaken
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
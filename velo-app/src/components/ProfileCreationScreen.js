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
    console.log(`Updating ${field}:`, value);
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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <div className="p-6 bg-white shadow-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600 mb-2">Maak je profiel</div>
          <p className="text-slate-600">Vertel ons iets over jezelf</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-6">
          
          {/* Personal Info Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <span className="text-2xl mr-3">👤</span>
              Persoonlijke info
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Naam
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Jouw naam"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Leeftijd
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="25"
                  min="16"
                  max="99"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Interests Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <span className="text-2xl mr-3">💫</span>
              Interesses
            </h2>
            <p className="text-sm text-slate-600 mb-4">Kies wat je leuk vindt (optioneel)</p>
            
            <div className="grid grid-cols-2 gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    formData.interests.includes(interest.id)
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xl mb-1">{interest.icon}</div>
                  <div className="text-xs font-medium">{interest.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Cycling Style Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <span className="text-2xl mr-3">🚴</span>
              Fietsstijl
            </h2>
            <p className="text-sm text-slate-600 mb-4">Hoe fiets jij het liefst?</p>
            
            <div className="space-y-3">
              {cyclingStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleInputChange('cyclingStyle', style.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.cyclingStyle === style.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className={`font-medium ${
                    formData.cyclingStyle === style.id ? 'text-orange-700' : 'text-slate-800'
                  }`}>
                    {style.label}
                  </div>
                  <div className={`text-sm ${
                    formData.cyclingStyle === style.id ? 'text-orange-600' : 'text-slate-600'
                  }`}>
                    {style.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 bg-white shadow-sm border-t border-slate-100">
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`py-4 px-8 rounded-xl font-medium transition-colors ${
              isFormValid
                ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isFormValid ? 'Profiel opslaan' : 'Vul alle velden in'}
          </button>
        </div>
      </div>
    </div>
  );
} 
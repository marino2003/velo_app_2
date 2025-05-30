'use client';

export default function NavigationBar({ currentScreen, onNavigate, matches, selectedStations }) {
  // Alleen tonen na onboarding
  if (currentScreen === 'onboarding' || currentScreen === 'station-detail') {
    return null;
  }

  const navItems = [
    {
      id: 'profile',
      icon: '👤',
      label: 'Profiel',
      disabled: false
    },
    {
      id: 'stations',
      icon: '🗺️',
      label: 'Route',
      disabled: false
    },
    {
      id: 'swipe',
      icon: '💕',
      label: 'Swipen',
      disabled: !selectedStations
    },
    {
      id: 'matches',
      icon: '🎯',
      label: 'Matches',
      disabled: matches.length === 0,
      badge: matches.length > 0 ? matches.length : null
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 shadow-lg">
      <div className="flex justify-around items-center py-3 px-4 max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => !item.disabled && onNavigate(item.id)}
            disabled={item.disabled}
            className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all relative ${
              currentScreen === item.id
                ? 'bg-orange-100 text-orange-600'
                : item.disabled
                ? 'text-slate-300'
                : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
            }`}
          >
            <div className="text-xl mb-1">{item.icon}</div>
            <span className="text-xs font-medium">{item.label}</span>
            
            {/* Badge voor matches */}
            {item.badge && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                {item.badge}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
} 
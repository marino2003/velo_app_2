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
      disabled: false,
      description: 'Jouw persoonlijke info'
    },
    {
      id: 'stations',
      icon: '🗺️',
      label: 'Route',
      disabled: false,
      description: 'Kies je fietsroute'
    },
    {
      id: 'swipe',
      icon: '💕',
      label: 'Swipen',
      disabled: !selectedStations,
      description: selectedStations ? 'Vind je ritmaatje' : 'Kies eerst een route'
    },
    {
      id: 'matches',
      icon: '🎯',
      label: 'Matches',
      disabled: matches.length === 0,
      description: matches.length === 0 ? 'Nog geen matches' : `${matches.length} ritmaatje${matches.length !== 1 ? 's' : ''}`,
      badge: matches.length > 0 ? matches.length : null
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 shadow-lg">
      <div className="flex justify-around items-center py-2 px-2 max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => !item.disabled && onNavigate(item.id)}
            disabled={item.disabled}
            className={`flex flex-col items-center py-2 px-2 rounded-xl transition-all relative group ${
              currentScreen === item.id
                ? 'bg-orange-100 text-orange-600 shadow-sm'
                : item.disabled
                ? 'text-slate-300'
                : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
            }`}
            title={item.description}
          >
            <div className="text-xl mb-1">{item.icon}</div>
            <span className="text-xs font-medium">{item.label}</span>
            
            {/* Badge voor matches */}
            {item.badge && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm animate-pulse">
                {item.badge}
              </div>
            )}

            {/* Progress indicator voor actieve stap */}
            {currentScreen === item.id && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></div>
            )}

            {/* Tooltip voor disabled items */}
            {item.disabled && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {item.description}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-slate-800"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
} 
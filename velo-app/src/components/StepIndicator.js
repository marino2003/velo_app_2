export default function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-4">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex items-center">
            <div 
              className={`w-4 h-4 rounded-full ${
                index <= currentStep 
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 shadow-md' 
                  : 'bg-slate-200'
              }`}
            />
            {index < totalSteps - 1 && (
              <div 
                className={`w-12 h-1 mx-2 rounded-full ${
                  index < currentStep 
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600' 
                    : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center text-sm font-medium text-orange-600">
        Stap {currentStep + 1} van {totalSteps}
      </div>
    </div>
  );
} 
export default function OnboardingStep({ step }) {
  return (
    <div className="text-center">
      {/* Icon */}
      <div className="text-7xl mb-8">
        {step.icon}
      </div>
      
      {/* Title */}
      <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-tight">
        {step.title}
      </h2>
      
      {/* Description */}
      <p className="text-slate-600 text-lg leading-relaxed">
        {step.description}
      </p>
    </div>
  );
} 
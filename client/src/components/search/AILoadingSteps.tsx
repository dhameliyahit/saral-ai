import React from 'react';
import { FaSearch, FaRobot, FaChartLine, FaLightbulb } from 'react-icons/fa';

interface AILoadingStepsProps {
  currentStep: number;
}

const AILoadingSteps: React.FC<AILoadingStepsProps> = ({ currentStep }) => {
  const steps = [
    {
      icon: FaSearch,
      label: 'Fetching Profiles',
      description: 'Searching across multiple platforms'
    },
    {
      icon: FaRobot,
      label: 'Semantic Analysis',
      description: 'AI understanding your requirements'
    },
    {
      icon: FaChartLine,
      label: 'Ranking & Scoring',
      description: 'Calculating best matches'
    },
    {
      icon: FaLightbulb,
      label: 'Preparing Insights',
      description: 'Generating smart recommendations'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index + 1 === currentStep;
          const isCompleted = index + 1 < currentStep;

          return (
            <div
              key={step.label}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-500 transform ${
                isActive
                  ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg'
                  : isCompleted
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {/* Step Number */}
              <div
                className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  isActive
                    ? 'bg-blue-500'
                    : isCompleted
                    ? 'bg-green-500'
                    : 'bg-gray-400'
                }`}
              >
                {isCompleted ? '✓' : index + 1}
              </div>

              {/* Icon */}
              <div
                className={`text-3xl mb-4 ${
                  isActive
                    ? 'text-blue-600'
                    : isCompleted
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`}
              >
                <Icon />
              </div>

              {/* Content */}
              <h3
                className={`font-semibold text-lg mb-2 ${
                  isActive ? 'text-blue-900' : isCompleted ? 'text-green-900' : 'text-gray-600'
                }`}
              >
                {step.label}
              </h3>
              <p
                className={`text-sm ${
                  isActive ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-500'
                }`}
              >
                {step.description}
              </p>

              {/* Loading Bar */}
              {isActive && (
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Text */}
      <div className="text-center">
        <p className="text-gray-600 mb-2">
          Step {currentStep} of {steps.length}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
          <div
            className="bg-linear-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AILoadingSteps;
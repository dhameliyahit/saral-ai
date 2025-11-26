import { FaCheckCircle, FaRegClock, FaSpinner } from 'react-icons/fa';

interface AILoaderProps {
  stages: {
    label: string;
    status: 'pending' | 'loading' | 'completed' | 'error';
  }[];
  currentStage: number;
}

const AILoader = ({ stages }: AILoaderProps) => {
  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500 text-lg" />;
      case 'loading':
        return <FaSpinner className="text-blue-500 text-lg animate-spin" />;
      case 'error':
        return <FaCheckCircle className="text-red-500 text-lg" />;
      default:
        return <FaRegClock className="text-gray-400 text-lg" />;
    }
  };

  const getStageColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'loading':
        return 'text-blue-600 bg-blue-50 border-blue-200 animate-pulse';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaSpinner className="text-white text-3xl animate-spin" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">AI is searching for candidates</h3>
        <p className="text-gray-600">This may take a few moments as we analyze thousands of profiles</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div
              key={index}
              className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-500 ${getStageColor(stage.status)}`}
            >
              <div className="shrink-0">
                {getStageIcon(stage.status)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{stage.label}</span>
                  <span className="text-sm font-medium capitalize">
                    {stage.status === 'loading' ? 'Processing...' : stage.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      stage.status === 'completed' 
                        ? 'bg-green-500 w-full' 
                        : stage.status === 'loading'
                        ? 'bg-blue-500 w-3/4 animate-pulse'
                        : 'bg-gray-300 w-0'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AILoader;
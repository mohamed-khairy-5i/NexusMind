
import React from 'react';

const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md">
        <div className="flex justify-center mb-4">
            <AlertTriangleIcon className="w-16 h-16 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-red-300 mb-2">
          An Error Occurred
        </h2>
        <p className="text-gray-400 mb-6">
          {message}
        </p>
        <button
          onClick={onRetry}
          className="group relative inline-flex items-center justify-center px-6 py-3 font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:from-indigo-700 hover:to-purple-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;

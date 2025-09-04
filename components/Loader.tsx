
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm z-10">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-600 border-t-indigo-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-gray-300">Generating your mind map...</p>
      <p className="text-sm text-gray-500">This might take a moment.</p>
    </div>
  );
};

export default Loader;

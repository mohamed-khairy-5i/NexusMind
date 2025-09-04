
import React from 'react';

const BulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-yellow-400">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
    </svg>
);

const Welcome: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="flex justify-center mb-4">
            <BulbIcon />
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-2">
          Unlock Your Ideas
        </h2>
        <p className="text-gray-400 mb-6">
          Simply enter a topic in the field above and let our AI assistant create a detailed and structured mind map for you instantly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 text-left">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-indigo-400">Example</h3>
                <p className="text-gray-300">"The history of space exploration"</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-cyan-400">Example</h3>
                <p className="text-gray-300">"أهمية تعلم الذكاء الاصطناعي"</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

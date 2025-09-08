import React from 'react';
import AppPage from './pages/AppPage';

const BrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 1 1h.3a1 1 0 0 1 .9.6L15 9.5V14a1 1 0 0 1-1 1h-1.3a1 1 0 0 0-.9.6L10.2 18a1 1 0 0 1-1.8 0l-1.6-3a1 1 0 0 0-.9-.6H5a1 1 0 0 1-1-1v-4.5l.7-2.1a1 1 0 0 1 .9-.6h.3a1 1 0 0 0 1-1V4.5A2.5 2.5 0 0 1 9.5 2z" />
        <path d="M14 15.5c.9 2.1 3.2 2.8 5 1.5" />
        <path d="M20 22c-2.2-.5-4-2.5-4-4.5" />
        <path d="M4 14c-1.1.9-1.8 2.3-1.5 3.5.3 1.5 1.5 2.5 3 2.5" />
        <path d="M4 22c2.2-.5 4-2.5 4-4.5" />
        <path d="M14.5 4.5c1.4-1 3.3-1.3 4.5-.5" />
        <path d="M19.5 2c-1.5.5-2.5 2-2.5 3.5" />
    </svg>
);

const SimpleHeader: React.FC = () => {
  return (
    <header className="flex-shrink-0 bg-gray-900/70 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center">
        <a href="#" className="flex items-center gap-3" onClick={(e) => e.preventDefault()}>
          <BrainIcon className="w-8 h-8 text-indigo-400" />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            NexusMind
          </h1>
        </a>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen font-sans text-white bg-gray-900">
      <SimpleHeader />
      {/* 
        The main content area grows to fill the remaining vertical space.
        overflow-hidden is added to contain the AppPage within its bounds.
      */}
      <main className="flex-grow overflow-hidden">
        <AppPage />
      </main>
    </div>
  );
};

export default App;

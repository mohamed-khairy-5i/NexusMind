import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import AppPage from './pages/AppPage';

// A simple hash-based router
const useHashNavigation = () => {
  // Initialize state with a default hash if the current one is empty
  const [hash, setHash] = useState(window.location.hash || '#/');

  const handleHashChange = () => {
    // Also handle empty hash during navigation
    setHash(window.location.hash || '#/');
  };

  useEffect(() => {
    // If the hash in the URL is empty, set it to the default.
    // This will also trigger the hashchange listener to sync state if it wasn't already.
    if (!window.location.hash) {
      window.location.hash = '#/';
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return hash;
};

const App: React.FC = () => {
  const route = useHashNavigation();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  const renderPage = () => {
    switch (route) {
      case '#/features':
        return <FeaturesPage />;
      case '#/app':
        return <AppPage />;
      case '#/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-white bg-gray-900">
      <Header currentRoute={route} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer currentRoute={route} />
    </div>
  );
};

export default App;
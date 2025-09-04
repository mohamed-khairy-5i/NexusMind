import React from 'react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-indigo-500 hover:bg-gray-800 transition-all duration-300">
    <div className="flex items-center justify-center w-12 h-12 mb-4 bg-indigo-600/20 rounded-lg border border-indigo-500/30 text-indigo-400">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /></svg>
      ),
      title: 'Instant AI Generation',
      description: 'Powered by Google\'s Gemini API, our tool transforms any topic into a comprehensive, structured mind map in seconds. Save hours of manual brainstorming.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11 3 3 6-6" /><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" /></svg>
      ),
      title: 'Interactive Canvas',
      description: 'Explore your ideas on a fully interactive canvas. Pan, zoom, and rearrange nodes with a smooth, intuitive interface built with React Flow.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
      ),
      title: 'Intuitive Inline Editing',
      description: 'Quickly refine your mind map by double-clicking any node to edit its content directly on the canvas. Your changes are saved instantly.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
      ),
      title: 'Auto-Save to Local Storage',
      description: 'Never worry about losing your work. Your mind maps are automatically saved to your browser\'s local storage, so you can pick up right where you left off.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" /><path d="M12 22c4.42 0 8-3.58 8-8s-3.58-8-8-8" /><path d="M12 2a6 6 0 1 0 0 12A6 6 0 0 0 12 2Z" /></svg>
      ),
      title: 'Smart Layout Engine',
      description: 'Our algorithm automatically arranges nodes in a clean, hierarchical tree structure, providing a perfectly organized map right from the start.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>
      ),
      title: 'Sleek & Modern UI',
      description: 'A beautiful dark-themed interface that is easy on the eyes, allowing you to focus on your ideas without distraction.',
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4">
            Features That Supercharge Your Brainstorming
          </h2>
          <p className="text-lg text-gray-400">
            Everything you need to visualize complex ideas, collaborate with your team, and bring your best thoughts to life.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        <div className="text-center mt-16">
            <a href="#/app" className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
                Start Generating for Free
            </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;

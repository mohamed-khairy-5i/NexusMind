import React from 'react';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-cyan-400">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const HomePage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 md:px-6">
            {/* Hero Section */}
            <section className="text-center py-20 md:py-32">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Visualize Your Ideas</span>, Instantly.
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 mb-8">
                    Leverage the power of AI to transform your thoughts and complex topics into structured, beautiful mind maps in seconds.
                </p>
                <div className="flex justify-center gap-4">
                    <a href="#/app" className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
                        Get Started for Free
                    </a>
                    <a href="#/features" className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gray-700/50 border border-gray-600 rounded-full transition-colors duration-300 hover:bg-gray-700">
                        Learn More
                    </a>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 md:py-24">
                 <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Unleash Your Creativity in 3 Simple Steps
                    </h2>
                    <p className="text-lg text-gray-400">
                       Go from a single thought to a complete visual plan effortlessly.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
                        <div className="text-5xl font-bold text-indigo-400 mb-4">1</div>
                        <h3 className="text-xl font-semibold mb-2">Enter Your Topic</h3>
                        <p className="text-gray-400">Start with a single word or a complex phrase. The AI understands context and nuance.</p>
                    </div>
                    <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
                        <div className="text-5xl font-bold text-indigo-400 mb-4">2</div>
                        <h3 className="text-xl font-semibold mb-2">Generate Instantly</h3>
                        <p className="text-gray-400">Click 'Generate' and watch as a detailed mind map is created for you in real-time.</p>
                    </div>
                    <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
                        <div className="text-5xl font-bold text-indigo-400 mb-4">3</div>
                        <h3 className="text-xl font-semibold mb-2">Edit & Explore</h3>
                        <p className="text-gray-400">Interact with your map, edit nodes, and dive deep into your generated ideas.</p>
                    </div>
                </div>
            </section>

             {/* Features Overview Section */}
            <section className="py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                           Built for clarity and speed.
                        </h2>
                        <p className="text-lg text-gray-400 mb-8">
                           Our AI Mind Map Generator is more than just a brainstorming tool. It's a powerful assistant designed to help you think better, learn faster, and organize information with ease.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center text-lg"><CheckIcon /> AI-Powered suggestions</li>
                            <li className="flex items-center text-lg"><CheckIcon /> Fully interactive canvas</li>
                            <li className="flex items-center text-lg"><CheckIcon /> Auto-saves your progress</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 shadow-2xl shadow-indigo-900/20">
                        <h3 className="text-2xl font-bold mb-4">A Smarter Way to Brainstorm</h3>
                        <p className="text-gray-400 mb-6">Stop staring at a blank page. Our tool helps you overcome creative blocks by providing a structured foundation of ideas that you can build upon. Perfect for students, professionals, and creatives alike.</p>
                        <a href="#/features" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                            See all features &rarr;
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;

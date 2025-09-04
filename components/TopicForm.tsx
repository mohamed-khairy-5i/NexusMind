
import React from 'react';

interface TopicFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const SparkleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const TopicForm: React.FC<TopicFormProps> = ({ topic, setTopic, onGenerate, isLoading }) => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <div className="flex-shrink-0">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-2xl mx-auto">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic, e.g., 'The Future of Renewable Energy'"
          className="w-full px-5 py-3 bg-gray-800 border-2 border-gray-600 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-md"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          {isLoading ? (
            'Generating...'
          ) : (
            <>
              <SparkleIcon className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
              Generate
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TopicForm;

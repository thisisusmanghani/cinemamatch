import React, { useState } from 'react';
import axios from 'axios';
import { Film, Search, Sparkles, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://cinemamatch-backend-12e3ece5f93b.herokuapp.com';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const result = await axios.post(`${API_URL}/api/recommendations`, {
        query: query
      });

      setResponse(result.data.recommendations);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  const exampleQueries = [
    "Suggest thriller movies similar to Inception",
    "Top-rated comedy movies from the last 2 years",
    "Korean movies similar to Parasite",
    "Family-friendly adventure movies"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Film className="w-10 h-10 text-purple-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">CinemaMatch</h1>
              <p className="text-purple-300 text-sm">Your Personal AI Movie Curator</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              Discover Your Next Favorite Movie
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Describe what you're looking for... (e.g., 'Suggest thriller movies similar to Inception and Shutter Island')"
                  className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-32"
                />
                <Search className="absolute top-4 right-4 w-5 h-5 text-gray-400" />
              </div>
              
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Finding Movies...
                  </>
                ) : (
                  <>
                    <Film className="w-5 h-5" />
                    Get Recommendations
                  </>
                )}
              </button>
            </form>

            {/* Example Queries */}
            <div className="mt-6">
              <p className="text-gray-300 text-sm mb-3">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {exampleQueries.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(example)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-sm text-gray-300 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-200">
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Results Display */}
        {response && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Film className="w-6 h-6 text-purple-400" />
                Your Personalized Recommendations
              </h2>
              <div 
                className="prose prose-invert prose-purple max-w-none text-gray-200"
                dangerouslySetInnerHTML={{ 
                  __html: response.replace(/\n/g, '<br />') 
                }}
              />
            </div>
          </div>
        )}

        {/* Features Section */}
        {!response && !loading && (
       
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-black/30 backdrop-blur-sm border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            Built with ❤️ using Agno AI, OpenAI GPT-4o, and React
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © 2024 CinemaMatch. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

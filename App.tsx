
import React, { useState, useCallback, useEffect } from 'react';
import type { Flight, GroundingSource } from './types';
import { fetchFlightData } from './services/geminiService';
import FlightCard from './components/FlightCard';
import Spinner from './components/Spinner';
import SourceLink from './components/SourceLink';

const App: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleFetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { flights, sources } = await fetchFlightData();
      setFlights(flights);
      setSources(sources);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setFlights([]);
      setSources([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 text-white font-sans">
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
            US Live Flight Tracker
          </h1>
          <p className="text-lg text-blue-200/80">
            Real-time flight data powered by Gemini with Google Search
          </p>
        </header>

        <div className="flex justify-center mb-8">
            <button
              onClick={handleFetchData}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 disabled:transform-none flex items-center"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Fetching Data...
                </>
              ) : (
                'Refresh Flight Data'
              )}
            </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-center my-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
             <div className="text-center">
              <Spinner size="lg"/>
              <p className="mt-4 text-lg text-blue-200/80">Contacting control tower...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flights.map((flight) => (
                <FlightCard key={flight.flightNumber} flight={flight} />
              ))}
            </div>
            {sources.length > 0 && (
              <div className="mt-12 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-200">Data Sources</h3>
                <ul className="space-y-2">
                  {sources.map((source, index) => (
                    <SourceLink key={index} source={source} />
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </main>
      <footer className="text-center py-6 text-gray-500">
        <p>&copy; {new Date().getFullYear()} US Live Flight Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

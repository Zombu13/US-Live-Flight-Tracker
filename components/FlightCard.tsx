import React from 'react';
import type { Flight } from '../types';

interface FlightCardProps {
  flight: Flight;
}

// Fix: Updated the PlaneIcon component's props to accept a `style` attribute for dynamic positioning.
const PlaneIcon: React.FC<{className?: string; style?: React.CSSProperties}> = ({className, style}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M20.34 9.32l-14-7a1 1 0 0 0-1.2.34l-1.88 3.76A1 1 0 0 0 4 8h5.59l-5.3 5.29a1 1 0 0 0 0 1.42l.71.71a1 1 0 0 0 1.42 0L11.7 10.12H16a1 1 0 0 0 .76-.36l3.76-1.88a1 1 0 0 0 .18-1.2Z" />
    </svg>
);

const SpeedIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.75 13.06a.75.75 0 0 0 1.5 0v-4.472l1.656-.955a.75.75 0 0 0-.75-1.3l-2.25 1.309V7.5a.75.75 0 0 0-1.5 0v3.81a.75.75 0 0 0 .344.65l3.5 2.024a.75.75 0 0 0 .75-1.3l-1.456-.84v-2.57Z" clipRule="evenodd" />
        <path d="M10.875 14.122a.75.75 0 0 0-1.06 1.06l-1.72-1.72a.75.75 0 0 0-1.06-1.06l-1.932 1.932a.75.75 0 1 0 1.06 1.06l1.22-1.22 1.72 1.72a.75.75 0 1 0 1.06-1.06l-1.22-1.22-1.72-1.72a.75.75 0 0 0-1.06 1.06l1.72 1.72Z" />
    </svg>
);

const AltitudeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06l-2.47-2.47V21a.75.75 0 0 1-1.5 0V4.81L8.78 7.28a.75.75 0 0 1-1.06-1.06l3.75-3.75Z" clipRule="evenodd" />
        <path d="M3 10.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" />
    </svg>
);

const AircraftIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.153 10.334c0 .828-1.098 1.5-2.453 1.5s-2.453-.672-2.453-1.5c0-.828 1.098-1.5 2.453-1.5s2.453.672 2.453 1.5Z" />
        <path fillRule="evenodd" d="M5.023 10.334c0-2.39 1.533-4.444 3.729-5.322l.626-1.879a.75.75 0 0 1 1.442.022l.482 1.446a3.75 3.75 0 0 1 5.483.081l.423-1.27a.75.75 0 0 1 1.446.48l-.208.625c2.31 1.08 3.824 3.235 3.824 5.762 0 3.59-2.91 6.5-6.5 6.5H11.5c-3.59 0-6.5-2.91-6.5-6.5Zm3.727 4.166a.75.75 0 0 1 0-1.5h6.5a.75.75 0 0 1 0 1.5h-6.5Z" clipRule="evenodd" />
    </svg>
);


const getStatusColor = (status: string): string => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('en route') || lowerStatus.includes('on time')) {
        return 'text-green-400 bg-green-500/20';
    }
    if (lowerStatus.includes('delayed')) {
        return 'text-yellow-400 bg-yellow-500/20';
    }
    if (lowerStatus.includes('landed')) {
        return 'text-blue-400 bg-blue-500/20';
    }
    if (lowerStatus.includes('cancelled')) {
        return 'text-red-400 bg-red-500/20';
    }
    return 'text-gray-400 bg-gray-500/20';
};

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-5 transition-all duration-300 hover:shadow-blue-500/20 hover:border-blue-700 transform hover:-translate-y-1 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-blue-300 font-semibold">{flight.airline}</p>
          <p className="text-xl font-bold text-white">{flight.flightNumber}</p>
        </div>
        <div className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(flight.status)}`}>
          {flight.status}
        </div>
      </div>

      {/* Progress Bar and Route */}
      <div>
        <div className="flex justify-between items-center text-white mb-2">
            <div className="text-left">
                <p className="text-2xl font-bold">{flight.origin.iata}</p>
                <p className="text-xs text-gray-400 truncate max-w-[100px]">{flight.origin.city}</p>
            </div>
            <div className="text-right">
                <p className="text-2xl font-bold">{flight.destination.iata}</p>
                <p className="text-xs text-gray-400 truncate max-w-[100px]">{flight.destination.city}</p>
            </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5 relative">
            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${flight.progressPercent}%` }}>
                <PlaneIcon className="w-5 h-5 text-white absolute -top-1.5" style={{ left: `calc(${flight.progressPercent}% - 10px)`}} />
            </div>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
            <span>Gate {flight.origin.gate} &bull; {flight.origin.scheduled}</span>
            <span>Gate {flight.destination.gate} &bull; {flight.destination.scheduled}</span>
        </div>
      </div>

      {/* Flight Details */}
      <div className="border-t border-gray-700 pt-4 flex justify-around text-center">
        <div className="flex flex-col items-center gap-1">
            <SpeedIcon className="w-6 h-6 text-blue-400" />
            <span className="text-sm font-bold text-white">{flight.speed}</span>
            <span className="text-xs text-gray-400">Speed</span>
        </div>
        <div className="flex flex-col items-center gap-1">
            <AltitudeIcon className="w-6 h-6 text-blue-400" />
            <span className="text-sm font-bold text-white">{flight.altitude}</span>
            <span className="text-xs text-gray-400">Altitude</span>
        </div>
        <div className="flex flex-col items-center gap-1">
            <AircraftIcon className="w-6 h-6 text-blue-400" />
            <span className="text-sm font-bold text-white truncate max-w-[100px]">{flight.aircraft}</span>
            <span className="text-xs text-gray-400">Aircraft</span>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
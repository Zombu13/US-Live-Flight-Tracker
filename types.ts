
export interface Flight {
  airline: string;
  flightNumber: string;
  origin: {
    iata: string;
    city: string;
    scheduled: string;
    gate: string;
  };
  destination: {
    iata: string;
    city: string;
    scheduled: string;
    gate: string;
  };
  status: string;
  aircraft: string;
  speed: string;
  altitude: string;
  progressPercent: number;
}

export interface GroundingSource {
    title: string;
    uri: string;
}

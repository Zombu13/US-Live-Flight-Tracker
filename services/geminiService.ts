import { GoogleGenAI } from "@google/genai";
import type { Flight, GroundingSource } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Utility function to extract JSON from a string, making it more robust.
const extractJson = (text: string): any => {
    // First, try to find a JSON markdown block.
    const markdownMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (markdownMatch && markdownMatch[1]) {
        try {
            return JSON.parse(markdownMatch[1]);
        } catch (e) {
            console.error("Failed to parse JSON from markdown block:", e);
            // If parsing fails, we'll try other methods below.
        }
    }

    // If no valid JSON in markdown, look for the first '[' and last ']'
    // to handle cases where the JSON array is embedded in other text.
    const startIndex = text.indexOf('[');
    const endIndex = text.lastIndexOf(']');
    if (startIndex !== -1 && endIndex > startIndex) {
        const jsonString = text.substring(startIndex, endIndex + 1);
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            console.error("Failed to parse substring as JSON:", e);
            // If this fails, we'll try parsing the whole text as a last resort.
        }
    }

    // Fallback for cases where Gemini might return raw JSON
    try {
        return JSON.parse(text);
    } catch(e) {
      // Add the raw response to the error for better debugging
      console.error("Raw Gemini Response for debugging:", text);
      throw new Error("Could not find or parse a valid JSON object in the response.");
    }
};


export async function fetchFlightData(): Promise<{ flights: Flight[], sources: GroundingSource[] }> {
  try {
    const prompt = `
      Provide a list of 10 real, currently active flights within the United States.
      For each flight, include the following details:
      - airline: The name of the airline.
      - flightNumber: The flight identifier.
      - origin: An object with iata, city, scheduled time, and gate.
      - destination: An object with iata, city, scheduled time, and gate.
      - status: The current status (e.g., 'En Route', 'Delayed', 'Landed').
      - aircraft: The type of aircraft (e.g., 'Boeing 737-800').
      - speed: The current ground speed in mph (e.g., '520 mph').
      - altitude: The current altitude in feet (e.g., '36,000 ft').
      - progressPercent: A number from 0 to 100 representing the flight's progress.

      Please format the response *only* as a JSON array of objects within a single markdown JSON code block.
      Do not add any introductory text or explanations outside of the code block.
      Example object:
      {
        "airline": "United Airlines",
        "flightNumber": "UA456",
        "origin": { "iata": "SFO", "city": "San Francisco", "scheduled": "10:30 AM", "gate": "D12" },
        "destination": { "iata": "ORD", "city": "Chicago", "scheduled": "4:45 PM", "gate": "C20" },
        "status": "En Route",
        "aircraft": "Boeing 737-900",
        "speed": "515 mph",
        "altitude": "34,000 ft",
        "progressPercent": 65
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const flightData = extractJson(response.text) as Flight[];

    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const sources: GroundingSource[] = groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web)
      .filter((webSource: any) => webSource && webSource.uri && webSource.title) || [];
      
    // Basic validation
    if (!Array.isArray(flightData)) {
      throw new Error("API response is not a valid array of flights.");
    }

    return { flights: flightData, sources };
  } catch (error) {
    console.error("Error fetching flight data from Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to fetch flight data: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while fetching flight data.");
  }
}
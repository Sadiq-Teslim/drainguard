export interface DrainData {
  id: number;
  locationName: string;
  coords: [number, number]; // [latitude, longitude]
  status: 'Safe' | 'Moderate' | 'High Risk';
  waterLevel: number; // in percentage
  flowSpeed: number; // in m/s
  blockage: boolean;
  history: { time: string; level: number }[];
  floodZone?: [number, number][];
  safeRoute?: [number, number][];
}

export const drains: DrainData[] = [
  {
    id: 1,
    locationName: "Surulere Central Market",
    coords: [6.5023, 3.3592],
    status: "High Risk",
    waterLevel: 85,
    flowSpeed: 0.2,
    blockage: true,
    history: [
      { time: '10:00', level: 40 },
      { time: '11:00', level: 65 },
      { time: '12:00', level: 75 },
      { time: '13:00', level: 85 },
    ],
    floodZone: [
      [6.5050, 3.3570], // Top-left corner
      [6.5055, 3.3615], // Top-right corner
      [6.5005, 3.3620], // Bottom-right corner
      [6.5000, 3.3575], // Bottom-left corner
    ],
    safeRoute: [
      [6.5023, 3.3592], // Start at the drain/user location
      [6.5000, 3.3585], // Point 2
      [6.4990, 3.3630], // Point 3 (goes around the flood zone)
      [6.5015, 3.3650], // Point 4
      [6.5040, 3.3660], // Point 5 (destination)
    ],
  },
  {
    id: 2,
    locationName: "Ikeja City Mall",
    coords: [6.6167, 3.3500],
    status: "Safe",
    waterLevel: 30,
    flowSpeed: 1.5,
    blockage: false,
    history: [
        { time: '10:00', level: 20 },
        { time: '11:00', level: 25 },
        { time: '12:00', level: 28 },
        { time: '13:00', level: 30 },
    ],
    floodZone: [
      [6.6190, 3.3480], // Top-left corner
      [6.6195, 3.3520], // Top-right corner
      [6.6145, 3.3525], // Bottom-right corner
      [6.6140, 3.3485], // Bottom-left corner
    ],
    safeRoute: [
      [6.6167, 3.3500], // Start at the drain/user location
      [6.6180, 3.3470], // Point 2
      [6.6200, 3.3530], // Point 3 (goes around the flood zone)
      [6.6150, 3.3540], // Point 4
      [6.6130, 3.3510], // Point 5 (destination)
    ],
  },
  {
    id: 3,
    locationName: "Lekki Phase 1",
    coords: [6.4478, 3.4723],
    status: "Moderate",
    waterLevel: 60,
    flowSpeed: 0.8,
    blockage: false,
    history: [
        { time: '10:00', level: 35 },
        { time: '11:00', level: 45 },
        { time: '12:00', level: 55 },
        { time: '13:00', level: 60 },
    ],
    floodZone: [
      [6.4500, 3.4700], // Top-left corner
      [6.4505, 3.4745], // Top-right corner
      [6.4455, 3.4750], // Bottom-right corner
      [6.4450, 3.4705], // Bottom-left corner
    ],
    safeRoute: [
      [6.4478, 3.4723], // Start at the drain/user location
      [6.4490, 3.4690], // Point 2
      [6.4520, 3.4760], // Point 3 (goes around the flood zone)
      [6.4460, 3.4770], // Point 4
      [6.4440, 3.4730], // Point 5 (destination)
    ],
  },
  {
    id: 4,
    locationName: "Victoria Island",
    coords: [6.4284, 3.4216],
    status: 'Safe',
    waterLevel: 25,
    flowSpeed: 1.8,
    blockage: false,
    history: [
        { time: '10:00', level: 15 },
        { time: '11:00', level: 20 },
        { time: '12:00', level: 22 },
        { time: '13:00', level: 25 },
    ],
    floodZone: [
      [6.4300, 3.4200], // Top-left corner
      [6.4305, 3.4240], // Top-right corner
      [6.4260, 3.4245], // Bottom-right corner
      [6.4255, 3.4205], // Bottom-left corner
    ],
    safeRoute: [
      [6.4284, 3.4216], // Start at the drain/user location
      [6.4295, 3.4190], // Point 2
      [6.4320, 3.4230], // Point 3 (goes around the flood zone)
      [6.4270, 3.4250], // Point 4
      [6.4250, 3.4220], // Point 5 (destination)
    ],
  }
];
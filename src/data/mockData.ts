export interface DrainData {
  id: number;
  locationName: string;
  coords: [number, number]; // [latitude, longitude]
  status: 'Safe' | 'Moderate' | 'High Risk';
  waterLevel: number; // in percentage
  flowSpeed: number; // in m/s
  blockage: boolean;
  history: { time: string; level: number }[];
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
    ]
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
    ]
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
    ]
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
    ]
  }
];
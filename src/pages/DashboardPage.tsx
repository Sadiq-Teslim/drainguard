import { useState, useEffect } from 'react';
import { drains as mockDrains } from '../data/mockData';
import type { DrainData } from '../data/mockData';
import MapComponent from '../components/MapComponent';
import DrainStatusPanel from '../components/DrainStatusPanel';
import AlertsPanel from '../components/AlertsPanel';
import DataChart from '../components/DataChart';
import Header from '../components/layout/Header';
import { BrainCircuit } from 'lucide-react';

export default function DashboardPage() {
  const [drains, setDrains] = useState<DrainData[]>(mockDrains);
  const [selectedDrain, setSelectedDrain] = useState<DrainData | null>(mockDrains[0]);
   const [showPrediction, setShowPrediction] = useState(false); // <-- NEW STATE


   useEffect(() => {
    const interval = setInterval(() => {
      setDrains(prevDrains =>
        prevDrains.map(drain => {
          // Randomly change water level slightly
          let newWaterLevel = drain.waterLevel + Math.floor(Math.random() * 5) - 2;
          newWaterLevel = Math.max(10, Math.min(95, newWaterLevel)); // Keep it within 10-95%

          // Update status based on new water level
          let newStatus: DrainData['status'] = 'Safe';
          if (newWaterLevel > 75) {
            newStatus = 'High Risk';
          } else if (newWaterLevel > 50) {
            newStatus = 'Moderate';
          }

          return { ...drain, waterLevel: newWaterLevel, status: newStatus };
        })
      );
    }, 10000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content: Map and Chart */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="h-[60vh] bg-white rounded-lg shadow-md p-2 relative">
            <MapComponent drains={drains} onSelectDrain={setSelectedDrain} showPrediction={showPrediction} />

            {/* THIS IS THE NEW TOGGLE BUTTON */}
            <div className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded-lg shadow-xl">
              <label htmlFor="predict-toggle" className="flex items-center cursor-pointer">
                <BrainCircuit className="h-6 w-6 text-purple-600 mr-2" />
                <span className="mr-3 text-gray-700 font-medium">Show AI Prediction</span>
                <div className="relative">
                  <input id="predict-toggle" type="checkbox" className="sr-only" checked={showPrediction} onChange={() => setShowPrediction(!showPrediction)} />
                  <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${showPrediction ? 'transform translate-x-full bg-purple-400' : ''}`}></div>
                </div>
              </label>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">
              Water Level History for: {selectedDrain?.locationName || 'N/A'}
            </h2>
            {selectedDrain ? <DataChart drain={selectedDrain} /> : <p>Select a drain to see its history.</p>}
          </div>
        </div>

        {/* Sidebar: Status and Alerts */}
        <div className="flex flex-col gap-4">
          <DrainStatusPanel drains={drains} onSelectDrain={setSelectedDrain} />
          <AlertsPanel drains={drains} />
        </div>
      </main>
    </div>
  );
}
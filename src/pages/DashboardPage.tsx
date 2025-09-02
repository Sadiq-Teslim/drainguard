import { useState } from 'react';
import type { drains as mockDrains, DrainData } from '../data/mockData';
import MapComponent from '../components/MapComponent';
import DrainStatusPanel from '../components/DrainStatusPanel';
import AlertsPanel from '../components/AlertsPanel';
import DataChart from '../components/DataChart';
import Header from '../components/layout/Header';

export default function DashboardPage() {
  const [drains, setDrains] = useState<DrainData[]>([]);
  const [selectedDrain, setSelectedDrain] = useState<DrainData | null>(drains[0]);

  // In a real app, you'd have a useEffect to fetch and update data
  // For the demo, we'll just use the static mock data

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content: Map and Chart */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="h-[60vh] bg-white rounded-lg shadow-md p-2">
            <MapComponent drains={drains} onSelectDrain={setSelectedDrain} />
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
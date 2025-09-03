import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { drains as mockDrains } from '../data/mockData';
import type { DrainData } from '../data/mockData';

// Re-usable components (you can also import them if you've split them)
import MapComponent from '../components/MapComponent'; // Assuming MapComponent is reusable
import { Siren, ShieldCheck, Plus } from 'lucide-react';

function CitizenPage() {
  // --- STATE MANAGEMENT ---
  const [drains, setDrains] = useState<DrainData[]>(mockDrains);
  const [selectedDrain, setSelectedDrain] = useState<DrainData | null>(null);
  
  // States to control the "mind-blowing" features
  const [showPrediction, setShowPrediction] = useState(false);
  const [showSafeRoute, setShowSafeRoute] = useState(false);
  
  // Define safeRouteOptions for the map
  const safeRouteOptions = {
    color: 'green',
    weight: 5,
    opacity: 0.8,
    dashArray: '10, 10',
  };

  // Find drains that are currently in a high-risk state
  const highRiskDrains = drains.filter(d => d.status === 'High Risk');
  const isAlertActive = highRiskDrains.length > 0;

  // --- LIVE DATA SIMULATION ---
  // This useEffect simulates real-time updates from the IoT sensors
  useEffect(() => {
    const interval = setInterval(() => {
      setDrains(prevDrains =>
        prevDrains.map(drain => {
          let newWaterLevel = drain.waterLevel + Math.floor(Math.random() * 5) - 2;
          newWaterLevel = Math.max(10, Math.min(95, newWaterLevel));
          
          let newStatus: DrainData['status'] = 'Safe';
          if (newWaterLevel > 75) newStatus = 'High Risk';
          else if (newWaterLevel > 50) newStatus = 'Moderate';
          
          return { ...drain, waterLevel: newWaterLevel, status: newStatus };
        })
      );
    }, 4000); // Update every 4 seconds for a realistic feel

    return () => clearInterval(interval);
  }, []);

  // Automatically show the prediction when an alert becomes active
  useEffect(() => {
    if (isAlertActive) {
      setShowPrediction(true);
    } else {
      setShowPrediction(false);
      setShowSafeRoute(false); // Also hide route if alert clears
    }
  }, [isAlertActive]);


  // --- RENDER LOGIC ---
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* --- HEADER --- */}
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">DrainGuard Citizen View</h1>
        </div>
        <Link to="/dashboard" className="text-sm text-gray-600 hover:underline">
          Admin View
        </Link>
      </header>
      
      {/* --- PERSONALIZED ALERT BANNER --- */}
      {isAlertActive && (
        <div className="bg-red-500 text-white p-4 text-center shadow-lg animate-pulse">
          <div className="flex items-center justify-center gap-3">
            <Siren size={24} />
            <p className="font-bold">
              FLOOD ALERT in {highRiskDrains.map(d => d.locationName).join(', ')}.
              Evacuation may be necessary.
            </p>
          </div>
        </div>
      )}

      {/* --- MAIN CONTENT (MAP & CONTROLS) --- */}
      <main className="relative h-[calc(100vh-140px)] w-full">
        <MapComponent
          drains={drains}
          onSelectDrain={setSelectedDrain}
          showPrediction={showPrediction}
          showRoute={showSafeRoute}
          safeRouteOptions={safeRouteOptions}
        />
        
        {/* --- FLOATING ACTION BUTTON FOR REPORTING --- */}
        <Link to="/report">
            <button
                title="Report a Blocked Drain"
                className="absolute bottom-6 right-6 z-[1000] bg-yellow-500 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:bg-yellow-600 transition-transform hover:scale-110"
            >
                <Plus size={32} />
            </button>
        </Link>
        
        {/* --- SAFE ROUTE AI BUTTON --- */}
        {isAlertActive && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000]">
                <button
                    onClick={() => setShowSafeRoute(!showSafeRoute)}
                    className={`px-6 py-3 font-bold text-white rounded-full shadow-2xl transition-all duration-300 ${showSafeRoute ? 'bg-blue-600' : 'bg-green-600'}`}
                >
                    {showSafeRoute ? 'Hide Safe Route' : 'Find My Safest Route'}
                </button>
            </div>
        )}

        {/* --- SELECTED DRAIN INFO PANEL (SIMPLIFIED) --- */}
        {selectedDrain && (
          <div className="absolute top-4 left-4 z-[1000] bg-white p-4 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="font-bold text-lg">{selectedDrain.locationName}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-600">Current Status:</span>
              <span className={`font-bold px-2 py-1 rounded-full text-sm ${
                { 'Safe': 'bg-green-100 text-green-800', 'Moderate': 'bg-yellow-100 text-yellow-800', 'High Risk': 'bg-red-100 text-red-800' }[selectedDrain.status]
              }`}>
                {selectedDrain.status}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-600">Water Level:</span>
              <span className="font-bold text-xl">{selectedDrain.waterLevel}%</span>
            </div>
             <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className={`h-2.5 rounded-full ${
                  { 'Safe': 'bg-green-500', 'Moderate': 'bg-yellow-500', 'High Risk': 'bg-red-500' }[selectedDrain.status]
                }`} style={{ width: `${selectedDrain.waterLevel}%` }}></div>
            </div>
            <button onClick={() => setSelectedDrain(null)} className="text-xs text-gray-500 hover:underline mt-3">Close</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default CitizenPage;

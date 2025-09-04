import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// FIX #1: Correct the import statement.
// We are now importing the 'drains' VALUE and the 'DrainData' TYPE.
import { drains as mockDrains, type DrainData } from '../data/mockData';

// We need to import the real MapComponent and Marker to add the user's location
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import MapComponent from './MapComponent';

import { Siren, Plus, LogOut } from 'lucide-react';

interface CitizenDashboardProps {
  userName: string;
  userCoords: [number, number];
}

// Custom blue icon for the user's location
const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function CitizenDashboard({ userName, userCoords }: CitizenDashboardProps) {
  const [drains, setDrains] = useState<DrainData[]>(mockDrains);
  const [showPrediction, setShowPrediction] = useState(false); // Start with false
  const [showSafeRoute, setShowSafeRoute] = useState(false);

  const highRiskDrains = drains.filter(d => d.status === 'High Risk');
  const isAlertActive = highRiskDrains.length > 0;

  // FIX #2: Add the missing useEffect hooks to make the dashboard dynamic.
  // This fixes the "unused variable" warnings.
  useEffect(() => {
    // This simulates live data updates from the IoT sensors
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
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // This automatically shows the flood prediction when an alert becomes active
    if (isAlertActive) {
      setShowPrediction(true);
    } else {
      setShowPrediction(false);
      setShowSafeRoute(false);
    }
  }, [isAlertActive]);


  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Welcome, {userName}!</h1>
        <button onClick={() => window.location.reload()} className="flex items-center gap-2 text-sm text-gray-600 hover:underline">
          <LogOut size={16} /> Change Location
        </button>
      </header>
      
      {isAlertActive && (
        <div className="bg-red-500 text-white p-4 text-center shadow-lg animate-pulse">
          <div className="flex items-center justify-center gap-3">
            <Siren size={24} />
            <p className="font-bold">FLOOD ALERT active in Surulere. Please be cautious.</p>
          </div>
        </div>
      )}

      <main className="relative h-[calc(100vh-140px)] w-full">
        <MapComponent
          drains={drains}
          onSelectDrain={() => {}}
          showPrediction={showPrediction}
          showRoute={showSafeRoute}
          safeRouteOptions={{ color: 'green', weight: 6, opacity: 0.6 }}
          center={userCoords}
          zoom={12}
        >
            <Marker position={userCoords} icon={userIcon}>
                <Popup>
                    <b>Your Location:</b><br/>
                    {userName}'s place in {Object.keys(locationLookup).find(key => locationLookup[key] === userCoords) || 'your chosen area'}
                </Popup>
            </Marker>
        </MapComponent>
        
        <Link to="/report">
            <button
                title="Report a Blocked Drain"
                className="absolute bottom-6 right-6 z-[1000] bg-yellow-500 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:bg-yellow-600 transition-transform hover:scale-110"
            >
                <Plus size={32} />
            </button>
        </Link>
        
        {isAlertActive && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000]">
                <button
                    onClick={() => setShowSafeRoute(!showSafeRoute)}
                    className={`px-6 py-3 font-bold text-white rounded-full shadow-2xl transition-all duration-300 ${showSafeRoute ? 'bg-blue-600' : 'bg-green-600'}`}
                >
                    {showSafeRoute ? 'Hide Safe Route' : 'Find Safest Route'}
                </button>
            </div>
        )}
      </main>
    </div>
  );
}
// You will need to import locationLookup to make the popup more dynamic
import { locationLookup } from '../data/locationData'; 
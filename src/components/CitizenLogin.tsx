import { useState } from 'react';
import { User, MapPin, LoaderCircle, LocateFixed } from 'lucide-react';

interface CitizenLoginProps {
  // onLogin now accepts coordinates directly
  onLogin: (name: string, location: string | [number, number]) => void;
  error?: string;
}

export default function CitizenLogin({ onLogin, error }: CitizenLoginProps) {
  const [name, setName] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [geoError, setGeoError] = useState('');

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && manualLocation) {
      onLogin(name, manualLocation.toLowerCase());
    }
  };

  const handleGetLocation = () => {
    if (!name) {
      setGeoError("Please enter your name first.");
      return;
    }
    
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoadingLocation(true);
    setGeoError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLogin(name, [latitude, longitude]);
        setIsLoadingLocation(false);
      },
      (err) => {
        // User-friendly error messages
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setGeoError("Location access denied. Please allow location access or enter it manually.");
            break;
          case err.POSITION_UNAVAILABLE:
            setGeoError("Location information is unavailable.");
            break;
          case err.TIMEOUT:
            setGeoError("The request to get user location timed out.");
            break;
          default:
            setGeoError("An unknown error occurred.");
            break;
        }
        setIsLoadingLocation(false);
      }
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl">
        <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome to DrainGuard</h1>
            <p className="text-gray-400 mt-2">Check flood risks in your area in real-time.</p>
        </div>

        <div className="mt-8 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">1. Enter Your Name</label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Sade"
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">2. Find Your Location</label>
              <button
                onClick={handleGetLocation}
                disabled={isLoadingLocation || !name}
                className="w-full mt-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isLoadingLocation ? (
                  <>
                    <LoaderCircle className="animate-spin h-5 w-5" />
                    Getting Location...
                  </>
                ) : (
                  <>
                    <LocateFixed className="h-5 w-5" />
                    Use My Current Location
                  </>
                )}
              </button>
            </div>
            
            {geoError && <p className="text-yellow-400 text-sm text-center">{geoError}</p>}
        </div>

        <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300">Enter Location Manually</label>
            <div className="mt-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text" id="location" value={manualLocation} onChange={(e) => setManualLocation(e.target.value)}
                placeholder="e.g., Lekki Phase 2"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
             <p className="text-xs text-gray-500 mt-1">For demo: try 'Lekki Phase 2', 'Ikeja', etc.</p>
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={!name || !manualLocation}
            className="w-full px-6 py-2 bg-gray-600 font-semibold rounded-lg shadow-md hover:bg-gray-500 transition-colors disabled:bg-gray-700 disabled:text-gray-500"
          >
            Check Manually
          </button>
        </form>
      </div>
    </div>
  );
}
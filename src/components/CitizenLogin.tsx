import { useState } from 'react';
import { User, MapPin } from 'lucide-react';

interface CitizenLoginProps {
  onLogin: (name: string, location: string) => void;
  error?: string;
}

export default function CitizenLogin({ onLogin, error }: CitizenLoginProps) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && location) {
      onLogin(name, location.toLowerCase());
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold">Welcome to DrainGuard</h1>
        <p className="text-gray-400 mt-2">Check flood risks in your area in real-time.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 text-left">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Your Name</label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Sade"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300">Your Location</label>
            <div className="mt-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Lekki Phase 2"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">For demo: try 'Lekki Phase 2', 'Ikeja', or 'Surulere'.</p>
          </div>
          
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-500"
            disabled={!name || !location}
          >
            Check My Area
          </button>
        </form>
      </div>
    </div>
  );
}
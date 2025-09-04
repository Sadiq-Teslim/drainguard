import { useState } from 'react';
import CitizenLogin from '../components/CitizenLogin';
import CitizenDashboard from '../components/CitizenDashboard';
import { locationLookup } from '../data/locationData';

export default function CitizenPage() {
  const [user, setUser] = useState<{ name: string; coords: [number, number] } | null>(null);
  const [loginError, setLoginError] = useState('');

  // This function is now more flexible
  const handleLogin = (name: string, locationData: string | [number, number]) => {
    let userCoords: [number, number] | undefined;

    if (typeof locationData === 'string') {
      // Handle manual text input
      userCoords = locationLookup[locationData.toLowerCase()];
    } else {
      // Handle direct GPS coordinates
      userCoords = locationData;
    }

    if (userCoords) {
      setUser({ name, coords: userCoords });
      setLoginError('');
    } else {
      setLoginError("Sorry, we couldn't find that location. Please try another.");
    }
  };

  if (!user) {
    return <CitizenLogin onLogin={handleLogin} error={loginError} />;
  }

  return <CitizenDashboard userName={user.name} userCoords={user.coords} />;
}
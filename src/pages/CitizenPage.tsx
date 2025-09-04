import { useState } from 'react';
import CitizenLogin from '../components/CitizenLogin';
import CitizenDashboard from '../components/CitizenDashboard'; // We will create this next
import { locationLookup } from '../data/locationData';

export default function CitizenPage() {
  const [user, setUser] = useState<{ name: string; coords: [number, number] } | null>(null);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (name: string, location: string) => {
    const userCoords = locationLookup[location.toLowerCase()];
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
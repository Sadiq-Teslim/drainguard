import { Droplets } from 'lucide-react';
import { Link } from 'react-router-dom'; // <-- IMPORT LINK

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Droplets className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">DrainGuard AI Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        {/* ADD THIS LINK/BUTTON */}
        <Link to="/report">
          <button className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-sm hover:bg-yellow-600 transition-colors text-sm">
            Report a Blocked Drain
          </button>
        </Link>
        <div className="text-sm text-gray-500">
          Live Status: <span className="text-green-500 font-semibold">● Online</span>
        </div>
      </div>
    </header>
  );
}
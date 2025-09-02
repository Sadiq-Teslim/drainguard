import { Link } from 'react-router-dom';
import { Droplets } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center p-8">
        <Droplets className="mx-auto h-24 w-24 text-blue-400" />
        <h1 className="text-5xl font-bold mt-4">DrainGuard AI</h1>
        <p className="text-xl mt-2 text-gray-300">Smart Flood Prediction & Drainage Health System</p>
        <p className="mt-4 max-w-2xl text-gray-400">
          Saving lives, protecting infrastructure, and empowering cities through real-time monitoring and AI-powered flood forecasting.
        </p>
        <Link to="/dashboard">
          <button className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
            View Live Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
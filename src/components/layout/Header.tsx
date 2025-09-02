import { Droplets } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Droplets className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">DrainGuard AI Dashboard</h1>
      </div>
      <div className="text-sm text-gray-500">
        Live Status: <span className="text-green-500 font-semibold">● Online</span>
      </div>
    </header>
  );
}
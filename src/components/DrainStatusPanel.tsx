import type { DrainData } from '../data/mockData';
import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';

interface StatusPanelProps {
  drains: DrainData[];
  onSelectDrain: (drain: DrainData) => void;
}

const statusInfo = {
  'Safe': { icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-50' },
  'Moderate': { icon: ShieldAlert, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  'High Risk': { icon: ShieldX, color: 'text-red-500', bg: 'bg-red-50' },
};

export default function DrainStatusPanel({ drains, onSelectDrain }: StatusPanelProps) {

  const statusOrder = { 'High Risk': 0, 'Moderate': 1, 'Safe': 2 };

  const sortedDrains = [...drains].sort((a, b) => {
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Drainage Status</h2>
      <ul className="space-y-3 max-h-[40vh] overflow-y-auto">
        {sortedDrains.map(drain => {
          const { icon: Icon, color, bg } = statusInfo[drain.status];
          return (
            <li
              key={drain.id}
              onClick={() => onSelectDrain(drain)}
              className={`p-3 rounded-lg flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow ${bg}`}
            >
              <div>
                <p className="font-semibold text-gray-800">{drain.locationName}</p>
                <p className={`text-sm font-medium ${color}`}>{drain.status}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-gray-700">{drain.waterLevel}%</span>
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
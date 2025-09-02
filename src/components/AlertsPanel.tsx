import { Siren, MessageCircle } from 'lucide-react';
import type { DrainData } from '../data/mockData';

interface AlertsProps {
  drains: DrainData[];
}

export default function AlertsPanel({ drains }: AlertsProps) {
  const highRiskDrains = drains.filter(d => d.status === 'High Risk');

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Siren className="text-red-500" />
          Active Flood Alerts
        </h2>
        {highRiskDrains.length > 0 ? (
          <div className="mt-2 p-3 bg-red-100 text-red-800 rounded-lg">
            <p className="font-semibold">⚠️ Flood risk detected!</p>
            <p>High risk levels at: {highRiskDrains.map(d => d.locationName).join(', ')}. Estimated time: 2 hours.</p>
          </div>
        ) : (
          <p className="mt-2 text-gray-500">No active flood alerts. All systems normal.</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold flex items-center gap-2">
          <MessageCircle className="text-blue-500" />
          Community Alert Simulation
        </h3>
        {/* Phone Mockup */}
        <div className="mt-2 bg-gray-800 rounded-2xl p-2 w-full max-w-sm mx-auto shadow-xl">
          <div className="bg-white rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-2">SMS/WhatsApp Message</p>
            <div className="bg-blue-100 text-gray-800 p-3 rounded-lg max-w-xs">
              <p className="font-bold">DrainGuard AI Alert:</p>
              <p>Heavy rainfall + blocked drain detected in {highRiskDrains[0]?.locationName || 'your area'}. Flood risk: HIGH. Consider moving to higher ground.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
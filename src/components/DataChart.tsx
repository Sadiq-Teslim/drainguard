import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { DrainData } from '../data/mockData';

interface ChartProps {
  drain: DrainData;
}

export default function DataChart({ drain }: ChartProps) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={drain.history}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis label={{ value: 'Water Level (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="level" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} name="Water Level" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
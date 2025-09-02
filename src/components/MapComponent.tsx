import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Make sure to import Leaflet's CSS
import type { DrainData } from '../data/mockData';
import L from 'leaflet';

// Fix for default marker icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom icons for different statuses
const getIcon = (status: DrainData['status']) => {
  const color = {
    'Safe': 'green',
    'Moderate': 'orange',
    'High Risk': 'red',
  }[status];

  return new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color:${color};" class="marker-pin"></div><div style="background-color:${color};" class="marker-pin-pulse"></div>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });
};

interface MapProps {
  drains: DrainData[];
  onSelectDrain: (drain: DrainData) => void;
}

// Add some CSS in `src/index.css` for the custom marker
/*
.marker-pin {
  width: 20px;
  height: 20px;
  border-radius: 50% 50% 50% 0;
  background: #c32525;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -10px 0 0 -10px;
  border: 2px solid white;
}
.marker-pin-pulse {
  background: rgba(0,0,0,0.2);
  border-radius: 50%;
  height: 14px;
  width: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: 11px 0px 0px -12px;
  transform: rotateX(55deg);
  z-index: -2;
}
*/

export default function MapComponent({ drains, onSelectDrain }: MapProps) {
  const position: [number, number] = [6.5244, 3.3792]; // Centered on Lagos

  return (
    <MapContainer center={position} zoom={11} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {drains.map(drain => (
        <Marker
          key={drain.id}
          position={drain.coords}
          icon={getIcon(drain.status)}
          eventHandlers={{
            click: () => {
              onSelectDrain(drain);
            },
          }}
        >
          <Popup>
            <b>{drain.locationName}</b><br />
            Status: {drain.status}<br />
            Water Level: {drain.waterLevel}%
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
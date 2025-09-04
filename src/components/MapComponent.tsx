import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Make sure to import Leaflet's CSS
import type { DrainData } from '../data/mockData';
import L, { type PathOptions } from 'leaflet';


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
  showPrediction: boolean;
  showRoute?: boolean;
  safeRouteOptions: PathOptions;
  center?: [number, number];
  zoom?: number;
  children?: React.ReactNode; // To allow passing in extra markers
}
const floodZoneOptions = {
  fillColor: 'red',
  color: 'red',
  weight: 2,
  opacity: 0.8,
  fillOpacity: 0.3,
};



export default function MapComponent({ drains, onSelectDrain, showPrediction, showRoute, safeRouteOptions, center, zoom, children }: MapProps) {
    const mapCenter = center || [6.5244, 3.3792];
  const mapZoom = zoom || 11;
  return (
    <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
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

      {showPrediction && drains.map(drain => {
        if (drain.status === 'High Risk' && drain.floodZone) {
          return (
            <Polygon key={`poly-${drain.id}`} pathOptions={floodZoneOptions} positions={drain.floodZone}>
              <Popup>
                <b>Predicted Flood Zone</b><br />
                Triggered by: {drain.locationName}<br />
                Risk Level: HIGH
              </Popup>
            </Polygon>
          );
        }
        return null;
      })}

      {showRoute && drains.map(drain => {
        if (drain.status === 'High Risk' && drain.safeRoute) {
          return <Polyline key={`route-${drain.id}`} positions={drain.safeRoute} pathOptions={safeRouteOptions} />;
        }
        return null;
      })}
      {children}
    </MapContainer>
  );
}
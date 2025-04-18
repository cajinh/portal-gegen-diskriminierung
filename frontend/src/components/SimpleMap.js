import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  GeoJSON,
  Polygon,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Marker-Icon setzen
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Komponente zum Einfärben des Außenbereichs
function OuterMask({ geoJsonData }) {
  const [outerPolygon, setOuterPolygon] = useState(null);

  useEffect(() => {
    if (!geoJsonData) return;

    const feature = geoJsonData.features[0]; // Nur erstes Feature
    const coords = feature.geometry.coordinates;

    const invertCoords = (ring) => ring.map(([lng, lat]) => [lat, lng]);

    const hole = invertCoords(coords[0]);

    const world = [
      [-90, -360],
      [-90, 360],
      [90, 360],
      [90, -360],
    ];

    setOuterPolygon([world, hole]);
  }, [geoJsonData]);

  if (!outerPolygon) return null;

  return (
    <Polygon
      positions={outerPolygon}
      pathOptions={{
        fillColor: 'rgba(0, 0, 0, 0.5)',
        fillOpacity: 0.6,
        stroke: false,
      }}
    />
  );
}

function FitBounds({ geoJsonData }) {
  const map = useMap();

  useEffect(() => {
    const geoJsonLayer = L.geoJSON(geoJsonData);
    const bounds = geoJsonLayer.getBounds();

    map.fitBounds(bounds, { padding: [20, 20], maxZoom: 16 });
    map.setMaxBounds(bounds.pad(0.1));
    const targetZoom = map.getBoundsZoom(bounds);
    map.setMinZoom(targetZoom);

    map.on('drag', () => {
      map.panInsideBounds(bounds, { animate: false });
    });

    map.on('zoomend', () => {
      if (!bounds.contains(map.getCenter())) {
        map.panInsideBounds(bounds, { animate: false });
      }
    });
  }, [geoJsonData, map]);

  const geoJsonStyle = {
    color: '#f50057',
    weight: 2,
    fillOpacity: 0.0,
  };

  return <GeoJSON data={geoJsonData} style={geoJsonStyle} />;
}

function SimpleMap() {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    fetch('/Vechta.geojson')
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data));
  }, []);

  return (
    <MapContainer
      center={[52.7269, 8.2857]}
      zoom={13}
      style={{ height: '87vh', width: '100vw' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoJsonData && (
        <>
          <OuterMask geoJsonData={geoJsonData} />
          <FitBounds geoJsonData={geoJsonData} />
        </>
      )}
      <Marker position={[52.7269, 8.2857]}>
        <Popup>Vechta Zentrum</Popup>
      </Marker>
    </MapContainer>
  );
}

export default SimpleMap;

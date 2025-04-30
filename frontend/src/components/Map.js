import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MeldeFormular from './MeldeFormular';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';
import InfoSnackbar from './InfoSnackbar';
import { fetchReports } from '../api/report';
import OuterMask from './OuterMask';
import FitBounds from './FitBounds';
import { useDefaultMarkerIcon } from '../hooks/useMarkerIcon';
import { categories as categoryLabels } from '../constants/categories';

// Kartenklicks
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

function Map() {
  useDefaultMarkerIcon();
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports().then((data) => {
      console.log('Gefetchte Reports:', data);
      setReports(data);
    });
  }, []);

  useEffect(() => {
    fetch('/Vechta.geojson')
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data));
  }, []);

  const handleMapClick = (latlng) => {
    if (!geoJsonData) return;

    const pt = point([latlng.lng, latlng.lat]);
    const polygon = geoJsonData.features[0];

    const isInside = booleanPointInPolygon(pt, polygon);

    if (isInside) {
      setSelectedPosition([latlng.lat, latlng.lng]);
      setShowForm(true);
    } else {
      alert('Bitte wähle eine Position innerhalb des markierten Bereichs.');
    }
  };

  return (
    <>
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

        {/* Marker für neue Meldung */}
        {selectedPosition && (
          <Marker position={selectedPosition}>
            <Popup>Neue Meldung</Popup>
          </Marker>
        )}

        {/* Marker für alle Meldungen in der DB */}
        {reports.map((report, index) => {
          const lat = parseFloat(report.location_lat);
          const lng = parseFloat(report.location_lng);

          console.log(`Marker #${index}`, lat, lng, report.description);

          if (!isNaN(lat) && !isNaN(lng)) {
            return (
              <Marker key={index} position={[lat, lng]}>
                <Popup>
                  <div>
                    <strong>Diskriminierung aufgrund </strong>
                    {report.categories.length > 0
                      ? report.categories.map((id, i) => (
                          <React.Fragment key={id}>
                            <strong>{categoryLabels[id]}</strong>
                            {i < report.categories.length - 1 && ', '}
                          </React.Fragment>
                        ))
                      : 'Keine Angabe'}
                    <br />
                    <strong>Beschreibung: </strong>
                    {report.description || 'Keine Beschreibung'}
                  </div>
                </Popup>
              </Marker>
            );
          }

          return null;
        })}

        <MapClickHandler onMapClick={handleMapClick} />
      </MapContainer>

      {/* Meldeformular anzeigen */}
      {showForm && (
        <MeldeFormular
          position={selectedPosition}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}

export default Map;

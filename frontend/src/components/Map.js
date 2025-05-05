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
import MarkerClusterGroup from 'react-leaflet-cluster';

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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

  const handleReportSuccess = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setShowForm(false);
    setSelectedPosition(null);
    fetchReports().then(setReports);
  };

  const handleMapClick = (latlng) => {
    if (!geoJsonData) return;

    const pt = point([latlng.lng, latlng.lat]);
    const polygon = geoJsonData.features[0];

    const isInside = booleanPointInPolygon(pt, polygon);

    if (isInside) {
      if (
        !selectedPosition ||
        selectedPosition[0] !== latlng.lat ||
        selectedPosition[1] !== latlng.lng
      ) {
        setSelectedPosition([latlng.lat, latlng.lng]);
        setShowForm(true);
      }
    } else {
      setSnackbarMessage(
        'Bitte klicke innerhalb des markierten Bereichs, um eine Meldung zu erstellen.',
      );
      setSnackbarOpen(true);
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
        <MarkerClusterGroup>
          {reports.map((report, index) => {
            const lat = parseFloat(report.location_lat);
            const lng = parseFloat(report.location_lng);

            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <Marker key={index} position={[lat, lng]}>
                  <Popup>
                    <div>
                      <strong>
                        {report.categories.length === 1
                          ? 'Kategorie:'
                          : 'Kategorien:'}
                      </strong>
                      <ul style={{ margin: 0, paddingLeft: '1em' }}>
                        {report.categories.map((id) => (
                          <li key={id}>
                            Diskriminierung aufgrund {categoryLabels[id]}
                          </li>
                        ))}
                      </ul>

                      <br />
                      <strong>Beschreibung:</strong>
                      <div
                        style={{
                          border: '1px solid #ccc',
                          padding: '0.5em',
                          marginTop: '0.25em',
                          borderRadius: '4px',
                          backgroundColor: '#f9f9f9',
                        }}
                      >
                        {report.description || 'Keine Beschreibung'}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            }
            return null;
          })}
        </MarkerClusterGroup>

        <MapClickHandler onMapClick={handleMapClick} />
      </MapContainer>

      {/* Meldeformular anzeigen */}
      {showForm && (
        <MeldeFormular
          position={selectedPosition}
          onClose={() => {
            setShowForm(false);
            setSelectedPosition(null);
          }}
          onSuccess={handleReportSuccess}
        />
      )}
      <InfoSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
}

export default Map;

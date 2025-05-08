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
import { fetchReports, updateReport } from '../api/report';
import OuterMask from './OuterMask';
import FitBounds from './FitBounds';
import { useDefaultMarkerIcon, useNewMarkerIcon } from '../hooks/useMarkerIcon';
import { categories as categoryLabels } from '../constants/categories';
import MarkerClusterGroup from 'react-leaflet-cluster';
import GeoSearchControlComponent from './GeoSearchControl';
import ZoomToMarker from './ZoomToMarker';

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
  const defaultMarkerIcon = useDefaultMarkerIcon();
  const newMarkerIcon = useNewMarkerIcon();
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

  const handleReportClick = async (reportId) => {
    try {
      await updateReport(reportId);
      handleReportSuccess('Vorfall erfolgreich gemeldet');
    } catch (error) {
      setSnackbarMessage('Fehler beim Melden.');
      setSnackbarOpen(true);
    }
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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Mitwirkende, Tiles courtesy of <a href="https://www.fossgis.de/">FOSSGIS e.V.</a>, <a href="https://www.openstreetmap.org/fixthemap">Mitmachen/Fehler melden</a>'
          url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
        />

        <GeoSearchControlComponent
          onResult={({ lat, lng }) => {
            if (!geoJsonData) return;

            const pt = point([lng, lat]);
            const polygon = geoJsonData.features[0];
            const isInside = booleanPointInPolygon(pt, polygon);

            if (isInside) {
              setSelectedPosition([lat, lng]);
              setShowForm(true);
            } else {
              setSnackbarMessage(
                'Die Adresse liegt außerhalb des markierten Gebiets.',
              );
              setSnackbarOpen(true);
            }
          }}
        />

        {geoJsonData && (
          <>
            <OuterMask geoJsonData={geoJsonData} />
            <FitBounds geoJsonData={geoJsonData} />
          </>
        )}

        {/* Marker für neue Meldung */}
        {selectedPosition && (
          <>
            <Marker position={selectedPosition} icon={newMarkerIcon}>
              <Popup>Neue Meldung</Popup>
            </Marker>
            <ZoomToMarker position={selectedPosition} />
          </>
        )}

        {/* Marker für alle Meldungen in der DB */}
        <MarkerClusterGroup>
          {reports.map((report, index) => {
            const lat = parseFloat(report.location_lat);
            const lng = parseFloat(report.location_lng);

            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <Marker
                  key={index}
                  position={[lat, lng]}
                  icon={defaultMarkerIcon}
                >
                  <Popup>
                    <div
                      style={{
                        position: 'relative',
                        minWidth: '200px',
                        paddingBottom: '1.5em',
                      }}
                    >
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleReportClick(report.id);
                        }}
                        style={{
                          position: 'absolute',
                          right: '0.5em',
                          fontSize: '0.85em',
                          color: '#d00',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                      >
                        Melden
                      </a>

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
                          }}
                        >
                          {report.description || 'Keine Beschreibung'}
                        </div>
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

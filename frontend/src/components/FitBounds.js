import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { GeoJSON } from 'react-leaflet';

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

export default FitBounds;

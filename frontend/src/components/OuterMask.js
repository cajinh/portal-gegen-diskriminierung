import React, { useEffect, useState } from 'react';
import { Polygon } from 'react-leaflet';

function OuterMask({ geoJsonData }) {
  const [outerPolygon, setOuterPolygon] = useState(null);

  useEffect(() => {
    if (!geoJsonData) return;

    const feature = geoJsonData.features[0];
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

export default OuterMask;

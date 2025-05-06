import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

function ZoomToMarker({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 17);
    }
  }, [position, map]);

  return null;
}

export default ZoomToMarker;

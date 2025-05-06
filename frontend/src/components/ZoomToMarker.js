import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function ZoomToMarker({ position }) {
  const map = useMap();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (position) {
      const offsetLat = isMd ? 0.0015 : 0;
      map.flyTo([position[0] - offsetLat, position[1]], 17);
    }
  }, [position, map, isMd]);

  return null;
}

export default ZoomToMarker;

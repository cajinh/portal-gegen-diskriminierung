import SimpleMap from '../SimpleMap';
import Footer from '../components/Footer';
import { Grid, Box } from '@mui/material';

function HomePage() {

  return (
    <Grid container direction="column" sx={{ height: '100vh' }}>
      {/* Header */}
      <Grid>
        <Box sx={{ backgroundColor: '#f5f5f5', p: 2 }}>
          Header 
        </Box>
      </Grid>

      {/* Body */}
      <Grid sx={{ flex: 1 }}>
        <Box sx={{ backgroundColor: '#cfe8fc' }}>
          <SimpleMap />
          <div id="map" style={{ height: '100%' }}></div>
        </Box>
      </Grid>

      {/* Footer */}
      <Grid>
        <Footer />
      </Grid>
    </Grid>
  );
}
export default HomePage;
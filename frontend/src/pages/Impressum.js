import SimpleMap from '../components/SimpleMap';
import Footer from '../components/Footer';
import { Grid, Box } from '@mui/material';
import Header from '../components/Header';

function Impressum() {
  return (
    <Grid container direction="column" sx={{ height: '100vh' }}>
      {/* Header */}
      <Grid sx={{ height: '8vh' }}>
        <Header />
      </Grid>

      {/* Body */}
      <Grid sx={{ flex: 1 }}>
        <Box sx={{ backgroundColor: '#cfe8fc' }}>
          <SimpleMap />
        </Box>
      </Grid>

      {/* Footer */}
      <Grid sx={{ height: '5vh' }}>
        <Footer />
      </Grid>
    </Grid>
  );
}
export default Impressum;

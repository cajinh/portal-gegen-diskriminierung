import SimpleMap from '../SimpleMap';
import Footer from '../components/Footer';
import { Grid, Box } from '@mui/material';
import Header from '../components/Header';

function HomePage() {

  return (
    <Grid container direction="column" sx={{ height: '100vh' }}>
      {/* Header */}
      <Grid>
        <Header />
      </Grid>

      {/* Body */}
      <Grid sx={{ flex: 1 }}>
        <Box sx={{ backgroundColor: '#cfe8fc' }}>
          <SimpleMap />
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
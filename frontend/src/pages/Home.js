import React from 'react';
import { Grid } from '@mui/material';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InfoSnackbar from '../components/InfoSnackbar';
import Map from '../components/Map';

function Home() {
  return (
    <Grid container direction="column" sx={{ height: '100vh' }}>
      <Grid sx={{ height: '8vh' }}>
        <Header />
      </Grid>

      <Grid sx={{ flex: 1 }}>
        <Map />
      </Grid>
      <InfoSnackbar
        message="Klicke auf die Karte um einen neuen Vorfall zu melden."
        autoHideDuration={null}
      />
      <Grid sx={{ height: '5vh' }}>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Home;

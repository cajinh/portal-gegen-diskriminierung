import React from 'react';
import { Grid, Typography } from '@mui/material';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Datenschutz() {
  return (
    <Grid container direction="column" sx={{ height: '100vh' }}>
      <Grid sx={{ height: '8vh' }}>
        <Header />
      </Grid>

      <Grid item sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
        <Typography variant="h4">Datenschutzerklärung</Typography>

        <Typography variant="body2" paragraph>
          Diese Website nutzt Kartenmaterial von OpenStreetMap. Die Kartendaten
          werden über Server des FOSSGIS e.V. (Deutschland) eingebunden. Dabei
          wird Ihre IP-Adresse an FOSSGIS übermittelt. Die Nutzung erfolgt auf
          Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
        </Typography>
      </Grid>

      <Grid sx={{ height: '5vh' }}>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Datenschutz;

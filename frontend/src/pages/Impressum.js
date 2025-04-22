import React from 'react';
import { Grid, Typography } from '@mui/material';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Impressum() {
  return (
    <Grid container direction="column" sx={{ height: '100vh' }}>
      <Grid sx={{ height: '8vh' }}>
        <Header />
      </Grid>

      <Grid sx={{ flex: 1 }}>
        <Typography variant="h4" sx={{ padding: 2 }}>
          {' '}
          Hier kommt das Impressum hin{' '}
        </Typography>
      </Grid>

      <Grid sx={{ height: '5vh' }}>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Impressum;

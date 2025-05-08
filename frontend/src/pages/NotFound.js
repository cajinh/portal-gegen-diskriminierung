import React from 'react';
import { Grid, Typography } from '@mui/material';
import Footer from '../components/Footer';
import Header from '../components/Header';

function NotFound() {
  return (
    <Grid container direction="column" sx={{ height: '100vh' }}>
      <Grid item sx={{ height: '8vh' }}>
        <Header />
      </Grid>

      <Grid
        item
        container
        sx={{ flex: 1 }}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" align="center" sx={{ padding: 2 }}>
          404 - DIE SEITE WURDE NICHT GEFUNDEN
        </Typography>
      </Grid>

      <Grid item sx={{ height: '5vh' }}>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default NotFound;

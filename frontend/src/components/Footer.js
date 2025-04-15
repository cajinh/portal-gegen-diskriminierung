import { Button, Grid, ThemeProvider } from '@mui/material';
import React from 'react';
import theme from '../theme';

function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        sx={{
          backgroundColor: 'primary.main',
          height: '100%',
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button
          variant="text"
          color="primary.main"
          sx={{ height: 15, margin: 1, padding: 0, color: 'white' }}
        >
          Impressum
        </Button>
      </Grid>
    </ThemeProvider>
  );
}

export default Footer;

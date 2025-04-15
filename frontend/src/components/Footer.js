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
        }}
      >
        <Grid item xs={12} style={{ textAlign: 'center', margin: 0 }}>
          <Button
            variant="contained"
            color="primary.main"
            sx={{ height: 10, margin: 1 }}
          >
            Button 1
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Footer;

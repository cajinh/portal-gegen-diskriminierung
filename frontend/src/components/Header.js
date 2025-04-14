import { Grid, ThemeProvider } from '@mui/material';
import React from 'react';
import theme from '../theme';

function Header() {
  return (
    <ThemeProvider theme={theme}>
    <Grid sx={{
          backgroundColor: 'primary.main',
          color: 'primary.main',
        }}>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
            <p> Header </p>
        </Grid>
    </Grid>
    </ThemeProvider>
  );
}

export default Header;
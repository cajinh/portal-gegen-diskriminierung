import { Button, Grid, ThemeProvider } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import theme from '../theme';

function Footer() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/impressum');
  };

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
          sx={{
            height: 15,
            margin: 1,
            padding: 0,
            color: 'white',
            fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1rem' },
          }}
          onClick={handleClick}
        >
          Impressum
        </Button>
      </Grid>
    </ThemeProvider>
  );
}

export default Footer;

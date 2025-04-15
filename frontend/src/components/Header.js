import { Box, Button, Grid, Tab, Tabs, ThemeProvider } from '@mui/material';
import React from 'react';
import theme from '../theme';

function Header() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Tabs mit Hintergrund"
        sx={{
          display: 'flex',
        }}
      >
        <Tab
          label="Home"
          sx={{
            minHeight: '8vh',
            backgroundColor: value === 0 ? 'primary.main' : 'transparent',
            color: 'black',
            '&.Mui-selected': {
              color: 'white',
            },
          }}
        />
        <Tab
          label="Über Diskriminierung"
          sx={{
            minHeight: '8vh',
            backgroundColor: value === 1 ? 'primary.main' : 'transparent',
            color: 'black',
            '&.Mui-selected': {
              color: 'white',
            },
          }}
        />
        <Tab
          label="Hilfe bei Vorfällen"
          sx={{
            minHeight: '8vh',
            backgroundColor: value === 2 ? 'primary.main' : 'transparent',
            color: 'black',
            '&.Mui-selected': {
              color: 'white',
            },
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}

export default Header;

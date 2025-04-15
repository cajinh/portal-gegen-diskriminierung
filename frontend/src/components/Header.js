import { Tab, Tabs, ThemeProvider } from '@mui/material';
import React from 'react';
import theme from '../theme';
import { href } from 'react-router-dom';

function Header({ activeTab, onTabChange }) {
  const handleChange = (event, newValue) => {
    onTabChange(newValue);
  };

  const tabBaseStyle = {
    minHeight: '8vh',
    color: 'black',
    '&.Mui-selected': {
      color: 'white',
    },
  };

  const getTabStyle = (isSelected) => ({
    ...tabBaseStyle,
    backgroundColor: isSelected ? 'primary.main' : 'transparent',
  });

  return (
    <ThemeProvider theme={theme}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        aria-label="Tabs mit Hintergrund"
        sx={{
          display: 'flex',
        }}
      >
        <Tab label="Home" sx={getTabStyle(activeTab === 0)} />
        <Tab label="Über Diskriminierung" sx={getTabStyle(activeTab === 1)} />
        <Tab label="Hilfe bei Vorfällen" sx={getTabStyle(activeTab === 2)} />
      </Tabs>
    </ThemeProvider>
  );
}

export default Header;

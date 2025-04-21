import { Tab, Tabs, ThemeProvider } from '@mui/material';
import React from 'react';
import theme from '../theme';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';

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
        <Tab
          icon={<HomeIcon />}
          iconPosition="start"
          label="Home"
          sx={getTabStyle(activeTab === 0)}
        />
        <Tab
          icon={<InfoIcon />}
          iconPosition="start"
          label="Über Diskriminierung"
          sx={getTabStyle(activeTab === 1)}
        />
        <Tab
          icon={<HelpIcon />}
          iconPosition="start"
          label="Hilfe bei Vorfällen"
          sx={getTabStyle(activeTab === 2)}
        />
      </Tabs>
    </ThemeProvider>
  );
}

export default Header;

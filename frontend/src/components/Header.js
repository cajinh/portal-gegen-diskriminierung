import { Tab, Tabs, ThemeProvider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import theme from '../theme';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';

function Header() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setActiveTab(0);
        break;
      case '/aboutdiscrimination':
        setActiveTab(1);
        break;
      case '/hilfe':
        setActiveTab(2);
        break;
      default:
        setActiveTab(0);
        break;
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
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
          component={Link}
          to="/"
        />
        <Tab
          icon={<InfoIcon />}
          iconPosition="start"
          label="Über Diskriminierung"
          sx={getTabStyle(activeTab === 1)}
          component={Link}
          to="/aboutdiscrimination"
        />
        <Tab
          icon={<HelpIcon />}
          iconPosition="start"
          label="Hilfe bei Vorfällen"
          sx={getTabStyle(activeTab === 2)}
          component={Link}
          to="/hilfe"
        />
      </Tabs>
    </ThemeProvider>
  );
}

export default Header;

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
        setActiveTab(false);
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
    '&:hover': {
      backgroundColor: isSelected ? 'primary.dark' : 'lightgrey',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        aria-label="Tabs mit Hintergrund"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          '& .MuiTab-root': {
            minWidth: 'auto',
          },
        }}
      >
        <Tab
          icon={
            <HomeIcon
              sx={{
                fontSize: { xs: 0, sm: 18, md: 20 },
                display: { xs: 'none', sm: 'block' },
              }}
            />
          }
          iconPosition="start"
          label="Home"
          sx={{
            ...getTabStyle(activeTab === 0),
            fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1rem' },
            padding: { xs: '6px', sm: '8px', md: '10px' },
          }}
          component={Link}
          to="/"
        />
        <Tab
          icon={
            <InfoIcon
              sx={{
                fontSize: { xs: 0, sm: 18, md: 20 },
                display: { xs: 'none', sm: 'block' },
              }}
            />
          }
          iconPosition="start"
          label="Über Diskriminierung"
          sx={{
            ...getTabStyle(activeTab === 1),
            fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1rem' },
            padding: { xs: '6px', sm: '8px', md: '10px' },
          }}
          component={Link}
          to="/aboutdiscrimination"
        />
        <Tab
          icon={
            <HelpIcon
              sx={{
                fontSize: { xs: 0, sm: 18, md: 20 },
                display: { xs: 'none', sm: 'block' },
              }}
            />
          }
          iconPosition="start"
          label="Hilfe bei Vorfällen"
          sx={{
            ...getTabStyle(activeTab === 2),
            fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1rem' },
            padding: { xs: '6px', sm: '8px', md: '10px' },
          }}
          component={Link}
          to="/hilfe"
        />
      </Tabs>
    </ThemeProvider>
  );
}

export default Header;

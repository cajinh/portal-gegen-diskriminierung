import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Impressum from './Impressum';
import SimpleMap from '../components/Map';
import HilfeBeiVorfall from './HilfeBeiVorfall';
import InfoSnackbar from '../components/InfoSnackbar';


const Layout = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <SimpleMap />;
      case 1:
        return <SimpleMap />;
      case 2:
        return <HilfeBeiVorfall />;
      case 3:
        return <Impressum />;
      default:
        return <SimpleMap />;
    }
  };

  return (
    <Grid container direction="column" sx={{ height: '100vh' }}>
      <Grid sx={{ height: '8vh' }}>
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
      </Grid>

      <Grid sx={{ flex: 1 }}>{renderContent()}</Grid>
      <InfoSnackbar />

      <Grid sx={{ height: '5vh' }}>
        <Footer onTabChange={setActiveTab} />
      </Grid>
    </Grid>
  );
};

export default Layout;

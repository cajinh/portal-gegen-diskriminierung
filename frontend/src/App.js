import React from 'react';
import Impressum from './pages/Impressum';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HilfeBeiVorfall from './pages/HilfeBeiVorfall';
import Home from './pages/Home';
import AboutDiscrimination from './pages/AboutDiscrimination';
import Datenschutz from './pages/Datenschutz';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutdiscrimination" element={<AboutDiscrimination />} />
        <Route path="hilfe" element={<HilfeBeiVorfall />} />
        <Route path="impressum" element={<Impressum />} />
        <Route path="datenschutz" element={<Datenschutz />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;

import React from 'react';
import Impressum from './pages/Impressum';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HilfeBeiVorfall from './pages/HilfeBeiVorfall';
import Home from './pages/Home';
import AboutDiscrimination from './pages/AboutDiscrimination';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutdiscrimination" element={<AboutDiscrimination />} />
        <Route path="hilfe" element={<HilfeBeiVorfall />} />
        <Route path="impressum" element={<Impressum />} />
      </Routes>
    </Router>
  );
}
export default App;

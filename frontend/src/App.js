import React from 'react';
import Impressum from './pages/Impressum';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';

function App() {
  //const [message, setMessage] = useState('');
  //useEffect(() => {
  //fetch('http://localhost:8080/hello')
  //.then((response) => response.text())
  //.then((data) => setMessage(data));
  //}, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/impressum" element={<Impressum />} />
      </Routes>
    </Router>
  );
}
export default App;

import React, { useEffect, useState }  from 'react';
import SimpleMap from './SimpleMap';

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("http://localhost:8080/hello")
        .then(response => response.text())
        .then(data => setMessage(data));
}, []);

  return (
    <div>
      <h1>My Leaflet.js and React Map</h1>
      <div className="App">
            <h1>{message}</h1>
      </div>
      <SimpleMap />
    </div>
  );
}
export default App;

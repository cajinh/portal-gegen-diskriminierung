import React, { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';

function App() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('http://localhost:8080/hello')
      .then((response) => response.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div>
      <HomePage />
    </div>
  );
}
export default App;

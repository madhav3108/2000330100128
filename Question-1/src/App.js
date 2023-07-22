import React, { useState } from 'react';
import axios from 'axios';

const proxyUrl = 'http://localhost:3002'; // Your proxy server URL

function App() {
  const [urls, setUrls] = useState('');
  const [result, setResult] = useState([]);

  const handleUrlsChange = (event) => {
    setUrls(event.target.value);
  };

  const fetchNumbers = async () => {
    try {
      const urlList = urls.split(',');
      const requests = urlList.map((url) => axios.get(`${proxyUrl}/numbers?url=${encodeURIComponent(url.trim())}`));
      const responses = await Promise.allSettled(requests);

      let mergedNumbers = new Set();

      responses.forEach((response) => {
        if (response.status === 'fulfilled' && response.value.status === 200) {
          const numbers = response.value.data.numbers;
          numbers.forEach((num) => mergedNumbers.add(num));
        }
      });

      setResult(Array.from(mergedNumbers).sort((a, b) => a - b));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Number Management Service</h1>
      <div>
        <label htmlFor="urls">Enter URLs (separated by commas): </label>
        <input type="text" id="urls" value={urls} onChange={handleUrlsChange} />
        <button onClick={fetchNumbers}>Fetch Numbers</button>
      </div>
      <div>
        <h2>Result:</h2>
        <ul>
          {result.map((number) => (
            <li key={number}>{number}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

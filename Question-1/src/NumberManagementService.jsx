import React, { useState } from 'react';
import axios from 'axios';

const NumberManagementService = () => {
  const [urls, setUrls] = useState([]);
  const [mergedNumbers, setMergedNumbers] = useState([]);

  const handleUrlChange = (e, index) => {
    const newUrls = [...urls];
    newUrls[index] = e.target.value;
    setUrls(newUrls);
  };

  const addUrlInput = () => {
    setUrls([...urls, '']);
  };

  const removeUrlInput = (index) => {
    const newUrls = urls.filter((url, i) => i !== index);
    setUrls(newUrls);
  };

  const fetchNumbers = async () => {
    const uniqueNumbers = new Set();

    const requests = urls.map(async (url) => {
      try {
        const response = await axios.get(url, { timeout: 500 });
        if (response.status === 200) {
          const data = response.data;
          data.numbers.forEach((number) => uniqueNumbers.add(number));
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error.message);
      }
    });

    await Promise.all(requests);

    const mergedNumbersArray = Array.from(uniqueNumbers).sort((a, b) => a - b);
    setMergedNumbers(mergedNumbersArray);
  };

  return (
    <div>
      <h2>Number Management Service</h2>
      {urls.map((url, index) => (
        <div key={index}>
          <input
            type="text"
            value={url}
            onChange={(e) => handleUrlChange(e, index)}
          />
          <button onClick={() => removeUrlInput(index)}>Remove URL</button>
        </div>
      ))}
      <button onClick={addUrlInput}>Add URL</button>
      <br />
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      <br />
      {mergedNumbers.length > 0 && (
        <div>
          <h3>Merged Unique Integers</h3>
          <ul>
            {mergedNumbers.map((number, index) => (
              <li key={index}>{number}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NumberManagementService;
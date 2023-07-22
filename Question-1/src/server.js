const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors()); // Enable CORS for all routes

app.get('/numbers', async (req, res) => {
  try {
    const urls = req.query.url;
    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({ error: 'Invalid URL list' });
    }

    const uniqueNumbers = new Set();

    const fetchPromises = urls.map(async (url) => {
      try {
        const response = await axios.get(url, { timeout: 500 });
        if (response.status === 200) {
          const numbers = response.data.numbers;
          numbers.forEach((num) => uniqueNumbers.add(num));
        }
      } catch (error) {
        // Ignore errors from individual requests
      }
    });

    await Promise.all(fetchPromises);

    const mergedUniqueNumbers = Array.from(uniqueNumbers).sort((a, b) => a - b);
    res.json({ numbers: mergedUniqueNumbers });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});

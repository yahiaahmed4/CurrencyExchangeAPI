const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Dummy cache (in-memory for simplicity)
let cache = {};

// Middleware for error handling and logging
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Endpoint to get exchange rate
app.get('/exchange', async (req, res) => {
  const { from, to } = req.query;
  
  // Validate input
  if (!from || !to) {
    return res.status(400).json({ error: 'Missing required parameters. Please provide both from and to parameters.' });
  }
  
  const cacheKey = `${from}_${to}`;
  
  // Check cache first
  if (cache[cacheKey]) {
    console.log('Cache hit!');
    return res.json({ from, to, rate: cache[cacheKey] });
  }
  
  try {
    // Call external API (example with exchange-rate-api)
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const rates = response.data.rates;
    
    // Check if 'to' currency exists in rates
    if (!rates[to]) {
      return res.status(400).json({ error: `Currency ${to} is not supported or invalid.` });
    }
    
    const exchangeRate = rates[to];
    
    // Cache the result for future use
    cache[cacheKey] = exchangeRate;
    
    res.json({ from, to, rate: exchangeRate });
  } catch (error) {
    console.error('Error fetching exchange rate:', error.message);
    res.status(500).json({ error: 'Failed to fetch exchange rate. Please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000/exchange?from=USD&to=EUR`);
  console.log(`Server is running on http://localhost:3000/exchange?from=EUR&to=JPY`);
  console.log(`Server is running on http://localhost:3000/exchange?from=EGP&to=USD`);
});

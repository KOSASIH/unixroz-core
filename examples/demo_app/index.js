// index.js - Main entry point for the Unixroz demo application

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Sample route demonstrating Unixroz features
app.get('/', (req, res) => {
    res.send('Welcome to the Unixroz Demo Application!');
});

// Example of an API call using Unixroz features
app.get('/api/data', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Unixroz Demo App is running on http://localhost:${PORT}`);
});

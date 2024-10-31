// index.js
const express = require('express');
const MonitoringService = require('./monitoringService');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the monitoring service
const providerUrl = 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'; // Replace with your Infura project ID or other provider
const monitoringService = new MonitoringService(providerUrl);

// Start monitoring transactions
monitoringService.startMonitoring();

// Basic health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Transaction monitoring service is running.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Transaction monitoring service running on http://localhost:${PORT}`);
});

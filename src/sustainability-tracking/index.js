// index.js
const express = require('express');
const SustainabilityService = require('./sustainabilityService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Initialize the sustainability service
const sustainabilityService = new SustainabilityService();

// Endpoint to update carbon emissions
app.post('/updateCarbonEmissions', (req, res) => {
    const { amount } = req.body;
    sustainabilityService.updateCarbonEmissions(amount);
    res.status(200).json({ success: true, message: 'Carbon emissions updated.' });
});

// Endpoint to update energy consumption
app.post('/updateEnergyConsumption', (req, res) => {
    const { amount } = req.body;
    sustainabilityService.updateEnergyConsumption(amount);
    res.status(200).json({ success: true, message: 'Energy consumption updated.' });
});

// Endpoint to update waste generated
app.post('/updateWasteGenerated', (req, res) => {
    const { amount } = req.body;
    sustainabilityService.updateWasteGenerated(amount);
    res.status(200).json({ success: true, message: 'Waste generated updated.' });
});

// Endpoint to get current sustainability metrics
app.get('/metrics', (req, res) => {
    const metrics = sustainabilityService.getMetrics();
    res.status(200).json({ success: true, metrics });
});

// Endpoint to fetch external sustainability data
app.post('/fetchExternalData', async (req, res) => {
    const { apiUrl } = req.body;
    await sustainabilityService.fetchExternalData(apiUrl);
    res.status(200).json({ success: true, message: 'External data fetched.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Sustainability tracking service running on http://localhost:${PORT}`);
});

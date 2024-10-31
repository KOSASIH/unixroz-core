// index.js
const express = require('express');
const bodyParser = require('body-parser');
const AnalyticsModel = require('./analyticsModel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const analyticsModel = new AnalyticsModel();

// Initialize and train the model with sample data
(async () => {
    await analyticsModel.createModel();

    // Sample data for training (e.g., historical market data)
    const xs = [1, 2, 3, 4, 5]; // Input features (e.g., time, price)
    const ys = [1.5, 2.5, 3.5, 4.5, 5.5]; // Output labels (e.g., future price)

    await analyticsModel.trainModel(xs, ys);
    console.log('Model trained successfully');
})();

// Endpoint to make predictions
app.post('/predict', async (req, res) => {
    const { input } = req.body;
    try {
        const prediction = await analyticsModel.predict(input);
        res.status(200).json({ success: true, prediction });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Predictive analytics service running on http://localhost:${PORT}`);
});

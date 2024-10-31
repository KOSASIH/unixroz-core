const express = require('express');
const bodyParser = require('body-parser');
const verificationService = require('./verificationService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to register identity
app.post('/register', async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await verificationService.registerIdentity(name, email);
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to verify identity
app.post('/verify', async (req, res) => {
    const { userAddress } = req.body;
    try {
        const result = await verificationService.verifyIdentity(userAddress);
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to revoke identity
app.post('/revoke', async (req

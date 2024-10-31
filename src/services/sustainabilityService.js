// src/services/sustainabilityService.js

const axios = require('axios');

class SustainabilityService {
    constructor() {
        this.apiUrl = process.env.SUSTAINABILITY_API_URL;
    }

    async trackCarbonFootprint(userId, data) {
        const response = await axios.post(`${this.apiUrl}/carbon-footprint`, {
            userId,
            data,
        });
        return response.data;
    }

    async getSustainabilityMetrics(userId) {
        const response = await axios.get(`${this.apiUrl}/metrics/${userId}`);
        return response.data;
    }

    async generateSustainabilityReport(userId) {
        const response = await axios.get(`${this.apiUrl}/report/${userId}`);
        return response.data;
    }
}

module.exports = new SustainabilityService();

// sustainabilityService.js
const axios = require('axios');

class SustainabilityService {
    constructor() {
        this.metrics = {
            carbonEmissions: 0,
            energyConsumption: 0,
            wasteGenerated: 0,
        };
    }

    // Method to update carbon emissions
    updateCarbonEmissions(amount) {
        this.metrics.carbonEmissions += amount;
        console.log(`Updated Carbon Emissions: ${this.metrics.carbonEmissions} kg CO2`);
    }

    // Method to update energy consumption
    updateEnergyConsumption(amount) {
        this.metrics.energyConsumption += amount;
        console.log(`Updated Energy Consumption: ${this.metrics.energyConsumption} kWh`);
    }

    // Method to update waste generated
    updateWasteGenerated(amount) {
        this.metrics.wasteGenerated += amount;
        console.log(`Updated Waste Generated: ${this.metrics.wasteGenerated} kg`);
    }

    // Method to get current sustainability metrics
    getMetrics() {
        return this.metrics;
    }

    // Method to fetch external sustainability data (e.g., from an API)
    async fetchExternalData(apiUrl) {
        try {
            const response = await axios.get(apiUrl);
            console.log('Fetched external sustainability data:', response.data);
            // Process the data as needed
        } catch (error) {
            console.error('Error fetching external data:', error.message);
        }
    }
}

module.exports = SustainabilityService;

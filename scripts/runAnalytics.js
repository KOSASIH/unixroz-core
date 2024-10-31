const fs = require('fs');
const path = require('path');
const { analyzeData } = require('../src/utils/analytics'); // Assuming you have an analytics function

const runAnalytics = async () => {
    try {
        // Load historical transaction data
        const dataPath = path.join(__dirname, '../data/transactions.json');
        const rawData = fs.readFileSync(dataPath);
        const transactions = JSON.parse(rawData);

        // Run predictive analytics
        const predictions = await analyzeData(transactions);

        // Output predictions
        console.log('Predicted outcomes:', predictions);
    } catch (error) {
        console.error('Error running analytics:', error);
    }
};

runAnalytics();

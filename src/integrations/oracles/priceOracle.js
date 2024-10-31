// integrations/oracles/priceOracle.js

const axios = require('axios');

class PriceOracle {
    constructor() {
        this.baseUrl = 'https://api.coingecko.com/api/v3/simple/price';
    }

    async getPrice(cryptoId) {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    ids: cryptoId,
                    vs_currencies: 'usd',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching price data:', error);
            throw new Error('Could not fetch price data');
        }
    }
}

module.exports = PriceOracle;

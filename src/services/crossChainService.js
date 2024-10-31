// src/services/crossChainService.js

const axios = require('axios');

class CrossChainService {
    constructor() {
        this.apiUrl = process.env.CROSS_CHAIN_API_URL;
    }

    async initiateCrossChainTransfer(fromChain, toChain, amount, recipient) {
        const response = await axios.post(`${this.apiUrl}/transfer`, {
            fromChain,
            toChain,
            amount,
            recipient,
        });
        return response.data;
    }

    async getTransferStatus(transactionId) {
        const response = await axios.get(`${this.apiUrl}/status/${transactionId}`);
        return response.data;
    }

    async getSupportedChains() {
        const response = await axios.get(`${this.apiUrl}/chains`);
        return response.data;
    }
}

module.exports = new CrossChainService();

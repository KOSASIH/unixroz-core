// tests/cross-chain.test.js
const CrossChainService = require('../crossChainService');

describe('Cross Chain Service', () => {
    let service;

    beforeEach(() => {
        service = new CrossChainService();
    });

    test('should initiate a cross-chain transaction', async () => {
        const result = await service.initiateTransaction('sourceChain', 'destinationChain', 'data');
        expect(result).toBe(true);
    });

    test('should fail to initiate a transaction with invalid data', async () => {
        await expect(service.initiateTransaction('sourceChain', 'destinationChain', '')).rejects.toThrow('Invalid data');
    });
});

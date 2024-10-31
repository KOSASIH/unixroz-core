// tests/transaction-monitoring.test.js
const TransactionMonitoringService = require('../transactionMonitoringService');

describe('Transaction Monitoring Service', () => {
    let service;

    beforeEach(() => {
        service = new TransactionMonitoringService();
    });

    test('should log a new transaction', () => {
        const transaction = service.logTransaction('txHash', 'fromAddress', 'toAddress', 100);
        expect(transaction).toHaveProperty('id');
        expect(transaction.hash).toBe('txHash');
    });

    test('should retrieve a transaction by hash', () => {
        const transaction = service.logTransaction('txHash', 'fromAddress', 'toAddress', 100);
        const retrieved = service.getTransactionByHash('txHash');
        expect(retrieved).toEqual(transaction);
    });

    test('should return null for a non-existent transaction', () => {
        const retrieved = service.getTransactionByHash('invalidHash');
        expect(retrieved).toBeNull();
    });
});

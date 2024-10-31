// tests/multi-signature-wallets.test.js
const MultiSignatureWalletService = require('../multiSignatureWalletService');

describe('Multi-Signature Wallet Service', () => {
    let service;

    beforeEach(() => {
        service = new MultiSignatureWalletService();
    });

    test('should create a new multi-signature wallet', () => {
        const wallet = service.createWallet(['address1', 'address2', 'address3'], 2);
        expect(wallet).toHaveProperty('id');
        expect(wallet.signers).toEqual(['address1', 'address2', 'address3']);
        expect(wallet.requiredSignatures).toBe(2);
    });

    test('should allow a transaction if enough signatures are provided', () => {
        const wallet = service.createWallet(['address1', 'address2', 'address3'], 2);
        const result = service.submitTransaction(wallet.id, 'transactionData', ['address1', 'address2']);
        expect(result).toBe(true);
    });

    test('should reject a transaction if not enough signatures are provided', () => {
        const wallet = service.createWallet(['address1', 'address2', 'address3'], 2);
        const result = service.submitTransaction(wallet.id, 'transactionData', ['address1']);
        expect(result).toBe(false);
    });
});

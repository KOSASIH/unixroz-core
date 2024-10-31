const SphincsPlusKeyGen = require('../algorithms/hash-based/sphincsPlusKeyGen');

describe('SphincsPlusKeyGen', () => {
    it('should generate a key pair', () => {
        const keyPair = SphincsPlusKeyGen.generateKeys();
        expect(keyPair).toHaveProperty('publicKey');
        expect(keyPair).toHaveProperty('privateKey');
    });
});

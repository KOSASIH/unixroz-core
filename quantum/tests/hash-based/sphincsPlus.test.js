const SphincsPlus = require('../algorithms/hash-based/sphincsPlus');

describe('SphincsPlus', () => {
    it('should sign and verify a message', () => {
        const sphincsPlus = new SphincsPlus();
        const message = 'Hello, World!';
        const signature = sphincsPlus.signMessage(message);
        expect(sphincsPlus.verifySignature(message, signature)).toBe(true);
    });
});

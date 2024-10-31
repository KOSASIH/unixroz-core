const McElieceKeyGen = require('../algorithms/code-based/mccElieceKeyGen');

describe('McElieceKeyGen', () => {
    it('should generate a key pair', () => {
        const keyPair = McElieceKeyGen.generateKeys();
        expect(keyPair).toHaveProperty('publicKey');
        expect(keyPair).toHaveProperty('privateKey');
    });
});

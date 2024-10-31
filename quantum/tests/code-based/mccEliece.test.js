const McElieceEncryption = require('../algorithms/code-based/mccEliece');

describe('McElieceEncryption', () => {
    it('should encrypt and decrypt a message', () => {
        const publicKey = 'publicKey'; // Placeholder
        const mceliece = new McElieceEncryption(publicKey);
        const message = 'Hello, World!';
        const ciphertext = mceliece.encryptMessage(message);
        const privateKey = 'privateKey'; // Placeholder
        const decryptedMessage = mceliece.decryptMessage(ciphertext, privateKey);
        expect(decryptedMessage).toBe(message);
    });
});

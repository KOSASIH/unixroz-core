// Import necessary libraries
const ntruKeyGen = require('./ntruKeyGen'); // Your NTRU key generation function
const crypto = require('crypto');

// Test suite for NTRU Key Generation
describe('ntruKeyGen', () => {
  test('Generates valid key pair', () => {
    const { publicKey, privateKey } = ntruKeyGen();
    expect(publicKey).toBeDefined();
    expect(privateKey).toBeDefined();
    expect(publicKey.length).toBeGreaterThan(0);
    expect(privateKey.length).toBeGreaterThan(0);
  });

  test('Public key is valid', () => {
    const { publicKey } = ntruKeyGen();
    expect(publicKey.every(element => element === 0 || element === 1)).toBe(true);
  });

  test('Private key is valid', () => {
    const { privateKey } = ntruKeyGen();
    expect(privateKey.every(element => element === 0 || element === 1)).toBe(true);
  });

  test('Generates different key pairs on each call', () => {
    const keyPair1 = ntruKeyGen();
    const keyPair2 = ntruKeyGen();

    expect(keyPair1.publicKey).not.toEqual(keyPair2.publicKey);
    expect(keyPair1.privateKey).not.toEqual(keyPair2.privateKey);
  });

  test('Encryption and Decryption with generated keys', () => {
    const { publicKey, privateKey } = ntruKeyGen();
    const message = Buffer.from('Hello, NTRU!', 'utf-8');

    const ntru = new (require('./ntruEncrypt'))({
      p: 11, // Example parameter
      q: 409, // Example parameter
      n: 701, // Example parameter
      publicKey,
      privateKey,
    });

    const ciphertext = ntru.encrypt(message);
    expect(ciphertext).toBeDefined();
    expect(ciphertext.length).toBeGreaterThan(0);

    const decryptedMessage = ntru.decrypt(ciphertext);
    expect(decryptedMessage.toString('utf-8')).toBe(message.toString('utf-8'));
  });
});

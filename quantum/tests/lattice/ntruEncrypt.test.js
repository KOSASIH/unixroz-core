// Import necessary libraries
const NTRUEncrypt = require('./ntruEncrypt'); // Your NTRU implementation
const crypto = require('crypto');

// Test suite for NTRUEncrypt
describe('NTRUEncrypt', () => {
  let ntru;

  beforeAll(() => {
    // Initialize NTRUEncrypt instance with parameters
    ntru = new NTRUEncrypt({
      p: 11, // Example parameter
      q: 409, // Example parameter
      n: 701, // Example parameter
      // Add other parameters as needed
    });
  });

  test('Key Generation', () => {
    const { publicKey, privateKey } = ntru.generateKeyPair();
    expect(publicKey).toBeDefined();
    expect(privateKey).toBeDefined();
    expect(publicKey.length).toBeGreaterThan(0);
    expect(privateKey.length).toBeGreaterThan(0);
  });

  test('Encryption and Decryption', () => {
    const { publicKey, privateKey } = ntru.generateKeyPair();
    const message = Buffer.from('Hello, NTRU!', 'utf-8');

    const ciphertext = ntru.encrypt(message, publicKey);
    expect(ciphertext).toBeDefined();
    expect(ciphertext.length).toBeGreaterThan(0);

    const decryptedMessage = ntru.decrypt(ciphertext, privateKey);
    expect(decryptedMessage.toString('utf-8')).toBe(message.toString('utf-8'));
  });

  test('Encryption with Invalid Key', () => {
    const invalidKey = crypto.randomBytes(32); // Random invalid key
    const message = Buffer.from('Hello, NTRU!', 'utf-8');

    expect(() => {
      ntru.encrypt(message, invalidKey);
    }).toThrow('Invalid public key');
  });

  test('Decryption with Invalid Ciphertext', () => {
    const { publicKey, privateKey } = ntru.generateKeyPair();
    const invalidCiphertext = Buffer.from('Invalid ciphertext');

    expect(() => {
      ntru.decrypt(invalidCiphertext, privateKey);
    }).toThrow('Invalid ciphertext');
  });
});

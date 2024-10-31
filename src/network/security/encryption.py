import os
import base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class Encryption:
    def __init__(self, key=None):
        """Initialize the Encryption class with a key."""
        if key is None:
            self.key = get_random_bytes(16)  # AES-128 requires a 16-byte key
            logging.info("Generated a new encryption key.")
        else:
            self.key = key
            logging.info("Using provided encryption key.")

    def encrypt(self, plaintext):
        """Encrypt the plaintext using AES encryption."""
        cipher = AES.new(self.key, AES.MODE_CBC)
        ct_bytes = cipher.encrypt(pad(plaintext.encode('utf-8'), AES.block_size))
        iv = base64.b64encode(cipher.iv).decode('utf-8')
        ct = base64.b64encode(ct_bytes).decode('utf-8')
        logging.info("Encryption successful.")
        return iv, ct

    def decrypt(self, iv, ciphertext):
        """Decrypt the ciphertext using AES decryption."""
        iv = base64.b64decode(iv)
        ct = base64.b64decode(ciphertext)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        plaintext = unpad(cipher.decrypt(ct), AES.block_size).decode('utf-8')
        logging.info("Decryption successful.")
        return plaintext

    def get_key(self):
        """Return the encryption key."""
        return self.key

    def set_key(self, key):
        """Set a new encryption key."""
        if len(key) != 16:
            raise ValueError("Key must be 16 bytes long for AES-128.")
        self.key = key
        logging.info("Encryption key updated.")

if __name__ == "__main__":
    # Example usage
    encryption = Encryption()
    message = "Hello, this is a secret message!"
    iv, encrypted_message = encryption.encrypt(message)
    logging.info(f"Encrypted message: {encrypted_message}")

    decrypted_message = encryption.decrypt(iv, encrypted_message)
    logging.info(f"Decrypted message: {decrypted_message}")

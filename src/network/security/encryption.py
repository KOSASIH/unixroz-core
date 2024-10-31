from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import os
import base64

class Encryption:
    def __init__(self, key=None):
        # Generate a random key if none is provided
        self.key = key or os.urandom(16)  # AES-128 requires a 16-byte key

    def encrypt(self, plaintext):
        """Encrypt the plaintext using AES encryption."""
        cipher = AES.new(self.key, AES.MODE_CBC)
        ct_bytes = cipher.encrypt(pad(plaintext.encode('utf-8'), AES.block_size))
        iv = base64.b64encode(cipher.iv).decode('utf-8')
        ct = base64.b64encode(ct_bytes).decode('utf-8')
        return iv, ct

    def decrypt(self, iv, ciphertext):
        """Decrypt the ciphertext using AES decryption."""
        iv = base64.b64decode(iv)
        ct = base64.b64decode(ciphertext)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        plaintext = unpad(cipher.decrypt(ct), AES.block_size).decode('utf-8')
        return plaintext

if __name__ == "__main__":
    encryption = Encryption()
    message = "Hello, secure world!"
    iv, encrypted_message = encryption.encrypt(message)
    print(f"IV: {iv}\nEncrypted: {encrypted_message}")

    decrypted_message = encryption.decrypt(iv, encrypted_message)
    print(f"Decrypted: {decrypted_message}")

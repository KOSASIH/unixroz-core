import socket
import threading
import json
import logging
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import base64

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class Encryption:
    def __init__(self, key):
        self.key = key

    def decrypt(self, iv, ciphertext):
        iv = base64.b64decode(iv)
        ct = base64.b64decode(ciphertext)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        plaintext = unpad(cipher.decrypt(ct), AES.block_size).decode('utf-8')
        return plaintext

class P2PNode:
    def __init__(self, host='localhost', port=5000, encryption_key=None):
        self.host = host
        self.port = port
        self.encryption_key = encryption_key or os.urandom(16)  # AES-128 requires a 16-byte key
        self.encryption = Encryption(self.encryption_key)
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    def connect_to_server(self):
        """Connect to the P2P communication server."""
        try:
            self.server_socket.connect((self.host, self.port))
            logging.info(f"Connected to P2P server at {self.host}:{self.port}")
            threading.Thread(target=self.receive_messages, daemon=True).start()
        except Exception as e:
            logging.error(f"Failed to connect to server: {e}")

    def receive_messages(self):
        """Receive messages from the server."""
        while True:
            try:
                message = self.server_socket.recv(1024).decode('utf-8')
                if not message:
                    break
                self.process_message(message)
            except Exception as e:
                logging.error(f"Error receiving message: {e}")
                break
        self.server_socket.close()

    def process_message(self, message):
        """Process incoming messages."""
        try:
            data = json.loads(message)
            msg_type = data.get('type')
            if msg_type == 'text':
                iv = data['iv']
                encrypted_content = data['content']
                decrypted_message = self.encryption.decrypt(iv, encrypted_content)
                logging.info(f"Received message: {decrypted_message}")
            else:
                logging.warning(f"Unknown message type: {msg_type}")
        except json.JSONDecodeError:
            logging.error(f"Failed to decode message: {message}")

    def send_message(self, message):
        """Send a message to the P2P server."""
        iv, encrypted_message = self.encryption.encrypt(message)
        payload = json.dumps({'type': 'text', 'content': encrypted_message, 'iv': iv})
        try:
            self.server_socket.sendall(payload.encode('utf-8'))
            logging.info(f"Sent message: {message}")
        except Exception as e:
            logging.error(f"Failed to send message: {e}")

if __name__ == "__main__":
    host = input("Enter the server host (default: localhost): ") or 'localhost'
    port = int(input("Enter the server port (default: 5000): ") or 5000)
    node = P2PNode(host, port)
    node.connect_to_server()

    logging.info("P2P node is active. Type your messages below.")
    while True:
        msg = input("Enter message to send: ")
        node.send_message(msg)

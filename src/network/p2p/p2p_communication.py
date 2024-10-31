import socket
import threading
import json
import logging
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import os
import base64

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class Encryption:
    def __init__(self, key=None):
        self.key = key or os.urandom(16)  # AES-128 requires a 16-byte key

    def encrypt(self, plaintext):
        cipher = AES.new(self.key, AES.MODE_CBC)
        ct_bytes = cipher.encrypt(pad(plaintext.encode('utf-8'), AES.block_size))
        iv = base64.b64encode(cipher.iv).decode('utf-8')
        ct = base64.b64encode(ct_bytes).decode('utf-8')
        return iv, ct

    def decrypt(self, iv, ciphertext):
        iv = base64.b64decode(iv)
        ct = base64.b64decode(ciphertext)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        plaintext = unpad(cipher.decrypt(ct), AES.block_size).decode('utf-8')
        return plaintext

class P2PCommunication:
    def __init__(self, host='localhost', port=5000):
        self.host = host
        self.port = port
        self.peers = set()
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_socket.bind((self.host, self.port))
        self.server_socket.listen(5)
        self.encryption = Encryption()
        logging.info(f"P2P server started on {self.host}:{self.port}")

    def start(self):
        threading.Thread(target=self.accept_connections, daemon=True).start()

    def accept_connections(self):
        while True:
            try:
                client_socket, address = self.server_socket.accept()
                logging.info(f"Connection from {address} has been established.")
                self.peers.add(address)
                threading.Thread(target=self.handle_client, args=(client_socket, address), daemon=True).start()
            except Exception as e:
                logging.error(f"Error accepting connections: {e}")

    def handle_client(self, client_socket, address):
        while True:
            try:
                message = client_socket.recv(1024).decode('utf-8')
                if not message:
                    break
                self.process_message(message, address)
            except ConnectionResetError:
                logging.warning(f"Connection reset by {address}.")
                break
            except Exception as e:
                logging.error(f"Error handling client {address}: {e}")
                break
        client_socket.close()
        self.peers.remove(address)
        logging.info(f"Connection to {address} closed.")

    def process_message(self, message, sender_address):
        try:
            data = json.loads(message)
            msg_type = data.get('type')
            if msg_type == 'text':
                self.broadcast(data['content'], sender_address)
            elif msg_type == 'file':
                self.handle_file_transfer(data['content'], sender_address)
            else:
                logging.warning(f"Unknown message type from {sender_address}: {msg_type}")
        except json.JSONDecodeError:
            logging.error(f"Failed to decode message from {sender_address}: {message}")

    def handle_file_transfer(self, file_data, sender_address):
        # Placeholder for file transfer handling
        logging.info(f"File transfer request from {sender_address}: {file_data}")

    def broadcast(self, message, sender_address):
        iv, encrypted_message = self.encryption.encrypt(message)
        for peer in self.peers:
            if peer != sender_address:
                try:
                    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                        sock.connect(peer)
                        payload = json.dumps({'type': 'text', 'content': encrypted_message, 'iv': iv})
                        sock.sendall(payload.encode('utf-8'))
                except Exception as e:
                    logging.error(f"Failed to send message to {peer}: {e}")

        def send_message(self, message):
        """Send a message to all connected peers."""
        self.broadcast(message, None)

if __name__ == "__main__":
    p2p = P2PCommunication()
    p2p.start()
    logging.info("P2P communication is active. Type your messages below.")
    while True:
        msg = input("Enter message to broadcast: ")
        p2p.send_message(msg)

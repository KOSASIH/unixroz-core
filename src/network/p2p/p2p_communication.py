import socket
import threading
import json

class P2PCommunication:
    def __init__(self, host='localhost', port=5000):
        self.host = host
        self.port = port
        self.peers = set()
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_socket.bind((self.host, self.port))
        self.server_socket.listen(5)
        print(f"P2P server started on {self.host}:{self.port}")

    def start(self):
        threading.Thread(target=self.accept_connections, daemon=True).start()

    def accept_connections(self):
        while True:
            client_socket, address = self.server_socket.accept()
            print(f"Connection from {address} has been established.")
            self.peers.add(address)
            threading.Thread(target=self.handle_client, args=(client_socket, address), daemon=True).start()

    def handle_client(self, client_socket, address):
        while True:
            try:
                message = client_socket.recv(1024).decode('utf-8')
                if not message:
                    break
                self.broadcast(message, address)
            except ConnectionResetError:
                break
        client_socket.close()
        self.peers.remove(address)

    def broadcast(self, message, sender_address):
        for peer in self.peers:
            if peer != sender_address:
                try:
                    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                        sock.connect(peer)
                        sock.sendall(message.encode('utf-8'))
                except Exception as e:
                    print(f"Failed to send message to {peer}: {e}")

    def send_message(self, message):
        self.broadcast(message, None)

if __name__ == "__main__":
    p2p = P2PCommunication()
    p2p.start()
    while True:
        msg = input("Enter message to broadcast: ")
        p2p.send_message(msg)

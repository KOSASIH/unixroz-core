import socket
import threading

class P2PNode:
    def __init__(self, host='localhost', port=5000):
        self.host = host
        self.port = port
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_socket.bind((self.host, self.port))
        self.server_socket.listen(5)
        print(f"P2P Node started on {self.host}:{self.port}")

    def start(self):
        threading.Thread(target=self.accept_connections, daemon=True).start()

    def accept_connections(self):
        while True:
            client_socket, address = self.server_socket.accept()
            print(f"Connected to {address}")
            threading.Thread(target=self.handle_client, args=(client_socket,), daemon=True).start()

    def handle_client(self, client_socket):
        while True:
            try:
                message = client_socket.recv(1024).decode('utf-8')
                if not message:
                    break
                print(f"Received message: {message}")
            except ConnectionResetError:
                break
        client_socket.close()

    def connect_to_peer(self, peer_host, peer_port):
        try:
            peer_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            peer_socket.connect((peer_host, peer_port))
            print(f"Connected to peer {peer_host}:{peer_port}")
            return peer_socket
        except Exception as e:
            print(f"Failed to connect to peer: {e}")
            return None

if __name__ == "__main__":
    node = P2PNode()
    node.start()
    while True:
        peer_host = input("Enter peer host: ")
        peer_port = int(input("Enter peer port: "))
        peer_socket = node.connect_to_peer(peer_host, peer_port)
        if peer_socket:
            while True:
                msg = input("Enter message to send: ")
                peer_socket.sendall(msg.encode('utf-8'))

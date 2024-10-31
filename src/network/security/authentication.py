import hashlib
import os
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class Authentication:
    def __init__(self, user_data_file='users.json'):
        """Initialize the Authentication class."""
        self.user_data_file = user_data_file
        self.load_users()

    def load_users(self):
        """Load user data from a JSON file."""
        if os.path.exists(self.user_data_file):
            with open(self.user_data_file, 'r') as f:
                self.users = json.load(f)
        else:
            self.users = {}
            logging.info("No user data found. Starting with an empty user database.")

    def save_users(self):
        """Save user data to a JSON file."""
        with open(self.user_data_file, 'w') as f:
            json.dump(self.users, f)
        logging.info("User  data saved.")

    def hash_password(self, password):
        """Hash a password using SHA-256."""
        return hashlib.sha256(password.encode('utf-8')).hexdigest()

    def register(self, username, password):
        """Register a new user."""
        if username in self.users:
            logging.warning("Registration failed: Username already exists.")
            return False
        self.users[username] = self.hash_password(password)
        self.save_users()
        logging.info(f"User  '{username}' registered successfully.")
        return True

    def login(self, username, password):
        """Authenticate a user."""
        if username not in self.users:
            logging.warning("Login failed: Username not found.")
            return False
        if self.users[username] == self.hash_password(password):
            logging.info(f"User  '{username}' logged in successfully.")
            return True
        else:
            logging.warning("Login failed: Incorrect password.")
            return False

if __name__ == "__main__":
    auth = Authentication()
    
    # Example usage
    while True:
        action = input("Do you want to register or login? (r/l): ").strip().lower()
        username = input("Enter username: ")
        password = input("Enter password: ")

        if action == 'r':
            if auth.register(username, password):
                print("Registration successful.")
            else:
                print("Registration failed.")
        elif action == 'l':
            if auth.login(username, password):
                print("Login successful.")
            else:
                print("Login failed.")
        else:
            print("Invalid action. Please enter 'r' for register or 'l' for login.")

import hashlib
import json
from time import time

class Ledger:
    def __init__(self):
        self.chain = []  # The blockchain
        self.current_transactions = []  # Transactions waiting to be added to the next block
        self.create_block(previous_hash='1', miner_address=None)  # Create the genesis block

    def create_block(self, nonce, previous_hash):
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.current_transactions,
            'nonce': nonce,
            'previous_hash': previous_hash,
        }
        self.current_transactions = []  # Reset the current transactions
        self.chain.append(block)
        return block

    def add_transaction(self, sender, recipient, amount):
        transaction = {
            'sender': sender,
            'recipient': recipient,
            'amount': amount,
            'timestamp': time(),
        }
        self.current_transactions.append(transaction)
        return self.last_block['index'] + 1  # Return the index of the block that will hold this transaction

    @property
    def last_block(self):
        return self.chain[-1]

    def hash(self, block):
        # Convert the block into a string and encode it
        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

    def validate_chain(self):
        # Validate the entire blockchain
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            previous = self.chain[i - 1]

            # Check if the hash of the block is correct
            if current['previous_hash'] != self.hash(previous):
                return False

            # Check if the block structure is valid
            if not self.validate_block_structure(current):
                return False

        return True

    def validate_block_structure(self, block):
        # Validate the structure of a block
        required_keys = ['index', 'timestamp', 'transactions', 'nonce', 'previous_hash']
        return all(key in block for key in required_keys)

    def get_balance(self, address):
        # Calculate the balance of a given address
        balance = 0
        for block in self.chain:
            for transaction in block['transactions']:
                if transaction['sender'] == address:
                    balance -= transaction['amount']
                if transaction['recipient'] == address:
                    balance += transaction['amount']
        return balance

    def get_all_transactions(self):
        # Retrieve all transactions in the ledger
        transactions = []
        for block in self.chain:
            transactions.extend(block['transactions'])
        return transactions

    def get_block(self, index):
        # Retrieve a block by its index
        if index < 1 or index > len(self.chain):
            return None
        return self.chain[index - 1]

    def get_chain(self):
        # Retrieve the entire blockchain
        return self.chain

    def clear_transactions(self):
        # Clear the current transactions (for testing or resetting)
        self.current_transactions = []

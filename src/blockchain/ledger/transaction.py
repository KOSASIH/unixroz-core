import hashlib
import json
import time
from ecdsa import SigningKey, VerifyingKey, SECP256k1

class Transaction:
    def __init__(self, sender, recipient, amount, signature=None):
        self.sender = sender
        self.recipient = recipient
        self.amount = amount
        self.timestamp = time.time()
        self.signature = signature

    def to_dict(self):
        return {
            'sender': self.sender,
            'recipient': self.recipient,
            'amount': self.amount,
            'timestamp': self.timestamp,
            'signature': self.signature
        }

    def sign_transaction(self, private_key):
        """Sign the transaction with the sender's private key."""
        if self.sender is None:
            raise ValueError("Transaction must be signed by a sender.")
        
        # Create a message to sign
        message = self.get_message()
        signing_key = SigningKey.from_string(private_key, curve=SECP256k1)
        self.signature = signing_key.sign(message).hex()

    def get_message(self):
        """Get the message to be signed."""
        return json.dumps(self.to_dict(), sort_keys=True).encode()

    def is_valid(self):
        """Validate the transaction by checking the signature."""
        if self.signature is None:
            return False
        
        # Create a message to verify
        message = self.get_message()
        verifying_key = VerifyingKey.from_string(bytes.fromhex(self.sender), curve=SECP256k1)
        return verifying_key.verify(bytes.fromhex(self.signature), message)

    def __repr__(self):
        return f"Transaction(sender={self.sender}, recipient={self.recipient}, amount={self.amount}, timestamp={self.timestamp}, signature={self.signature})"

class TransactionPool:
    def __init__(self):
        self.transactions = []

    def add_transaction(self, transaction):
        if transaction.is_valid():
            self.transactions.append(transaction)
            return True
        return False

    def clear_transactions(self):
        self.transactions = []

    def get_all_transactions(self):
        return [tx.to_dict() for tx in self.transactions]

    def get_transaction_count(self):
        return len(self.transactions)

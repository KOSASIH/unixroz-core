import hashlib
import time
from collections import defaultdict

class Validator:
    def __init__(self, address, balance):
        self.address = address
        self.balance = balance
        self.stake = 0

    def stake_tokens(self, amount):
        if amount <= self.balance:
            self.stake += amount
            self.balance -= amount
            return True
        return False

    def unstake_tokens(self, amount):
        if amount <= self.stake:
            self.stake -= amount
            self.balance += amount
            return True
        return False

class ProofOfStake:
    def __init__(self, total_supply):
        self.total_supply = total_supply
        self.validators = {}
        self.block_rewards = 50  # Example block reward
        self.staking_period = 604800  # 7 days in seconds
        self.last_block_time = time.time()
        self.blockchain = []

    def register_validator(self, address, initial_balance):
        if address not in self.validators:
            self.validators[address] = Validator(address, initial_balance)

    def stake(self, address, amount):
        if address in self.validators:
            return self.validators[address].stake_tokens(amount)
        return False

    def unstake(self, address, amount):
        if address in self.validators:
            return self.validators[address].unstake_tokens(amount)
        return False

    def calculate_stake(self, address):
        if address in self.validators:
            return self.validators[address].stake / self.total_supply
        return 0

    def select_validator(self):
        total_stake = sum(validator.stake for validator in self.validators.values())
        if total_stake == 0:
            return None

        selection = random.uniform(0, total_stake)
        current_sum = 0
        for validator in self.validators.values():
            current_sum += validator.stake
            if current_sum >= selection:
                return validator.address
        return None

    def validate_block(self, block):
        current_time = time.time()
        if current_time - self.last_block_time < self.staking_period:
            print("Block validation failed: Staking period not met.")
            return False

        selected_validator = self.select_validator()
        if selected_validator is None:
            print("No validators available for block validation.")
            return False

        # Validate block (e.g., check hash, transactions, etc.)
        if self.is_valid_block(block):
            self.blockchain.append(block)
            self.last_block_time = current_time
            self.distribute_rewards(selected_validator)
            return True
        return False

    def is_valid_block(self, block):
        # Implement block validation logic (e.g., hash verification)
        return True  # Placeholder for actual validation logic

    def distribute_rewards(self, validator_address):
        if validator_address in self.validators:
            self.validators[validator_address].balance += self.block_rewards
            print(f"Rewards of {self.block_rewards} distributed to {validator_address}.")

    def get_validator_info(self, address):
        if address in self.validators:
            validator = self.validators[address]
            return {
                "address": validator.address,
                "balance": validator.balance,
                "stake": validator.stake
            }
        return None

    def get_all_validators(self):
        return {address: validator.balance for address, validator in self.validators.items()}

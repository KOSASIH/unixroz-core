import json
import time
from hashlib import sha256

class SmartContract:
    def __init__(self, owner, code, initial_state=None):
        self.owner = owner
        self.code = code  # Smart contract code (in a simplified format)
        self.state = initial_state if initial_state is not None else {}
        self.creation_time = time.time()
        self.events = []

    def execute(self, function_name, *args):
        """Execute a function in the smart contract."""
        if function_name not in self.code:
            raise ValueError(f"Function {function_name} not found in contract.")
        
        function = self.code[function_name]
        result = function(self, *args)
        self.log_event(f"Executed {function_name} with args: {args}")
        return result

    def log_event(self, event):
        """Log an event related to the smart contract execution."""
        self.events.append({
            'timestamp': time.time(),
            'event': event
        })

    def get_events(self):
        """Retrieve all events logged for this contract."""
        return self.events

    def get_state(self):
        """Retrieve the current state of the smart contract."""
        return self.state

    def update_state(self, key, value):
        """Update the state of the smart contract."""
        self.state[key] = value
        self.log_event(f"State updated: {key} = {value}")

    def get_contract_hash(self):
        """Get a hash of the smart contract for integrity verification."""
        contract_data = {
            'owner': self.owner,
            'code': self.code,
            'state': self.state,
            'creation_time': self.creation_time
        }
        return sha256(json.dumps(contract_data, sort_keys=True).encode()).hexdigest()

class SmartContractManager:
    def __init__(self):
        self.contracts = {}

    def deploy_contract(self, owner, code, initial_state=None):
        """Deploy a new smart contract."""
        contract = SmartContract(owner, code, initial_state)
        contract_id = contract.get_contract_hash()  # Use hash as a unique identifier
        self.contracts[contract_id] = contract
        return contract_id

    def get_contract(self, contract_id):
        """Retrieve a smart contract by its ID."""
        return self.contracts.get(contract_id)

    def execute_contract_function(self, contract_id, function_name, *args):
        """Execute a function on a deployed smart contract."""
        contract = self.get_contract(contract_id)
        if contract:
            return contract.execute(function_name, *args)
        raise ValueError("Contract not found.")

    def get_all_contracts(self):
        """Retrieve all deployed smart contracts."""
        return {cid: contract.get_state() for cid, contract in self.contracts.items()}

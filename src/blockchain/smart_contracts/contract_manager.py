from .smart_contract import SmartContract, SmartContractManager

class ContractManager:
    def __init__(self):
        self.manager = SmartContractManager()

    def deploy_contract(self, owner, code, initial_state=None):
        """Deploy a new smart contract and return its unique identifier."""
        contract_id = self.manager.deploy_contract(owner, code, initial_state)
        return contract_id

    def execute_contract_function(self, contract_id, function_name, *args):
        """Execute a function on a deployed smart contract."""
        try:
            result = self.manager.execute_contract_function(contract_id, function_name, *args)
            return result
        except ValueError as e:
            print(f"Error executing contract function: {e}")
            return None

    def get_contract_state(self, contract_id):
        """Retrieve the current state of a smart contract."""
        contract = self.manager.get_contract(contract_id)
        if contract:
            return contract.get_state()
        return None

    def get_contract_events(self, contract_id):
        """Retrieve all events logged for a smart contract."""
        contract = self.manager.get_contract(contract_id)
        if contract:
            return contract.get_events()
        return None

    def update_contract_state(self, contract_id, key, value):
        """Update the state of a smart contract."""
        contract = self.manager.get_contract(contract_id)
        if contract:
            contract.update_state(key, value)
            return True
        return False

    def get_all_contracts(self):
        """Retrieve all deployed smart contracts and their states."""
        return self.manager.get_all_contracts()

    def get_contract_hash(self, contract_id):
        """Get the hash of a smart contract for integrity verification."""
        contract = self.manager.get_contract(contract_id)
        if contract:
            return contract.get_contract_hash()
        return None

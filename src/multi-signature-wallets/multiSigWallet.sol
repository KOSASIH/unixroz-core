// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiSigWallet {
    address[] public owners;
    mapping(address => bool) public isOwner;
    uint256 public requiredConfirmations;

    struct Transaction {
        address to;
        uint256 value;
        bool executed;
        uint256 confirmations;
        mapping(address => bool) isConfirmed;
    }

    Transaction[] public transactions;

    event TransactionSubmitted(uint256 indexed transactionId, address indexed to, uint256 value);
    event TransactionConfirmed(uint256 indexed transactionId, address indexed owner);
    event TransactionExecuted(uint256 indexed transactionId);
    event OwnerAdded(address indexed owner);
    event OwnerRemoved(address indexed owner);
    event RequiredConfirmationsChanged(uint256 requiredConfirmations);

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not an owner");
        _;
    }

    modifier transactionExists(uint256 transactionId) {
        require(transactionId < transactions.length, "Transaction does not exist");
        _;
    }

    modifier notExecuted(uint256 transactionId) {
        require(!transactions[transactionId].executed, "Transaction already executed");
        _;
    }

    constructor(address[] memory _owners, uint256 _requiredConfirmations) {
        require(_owners.length > 0, "Owners required");
        require(_requiredConfirmations > 0 && _requiredConfirmations <= _owners.length, "Invalid number of required confirmations");

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Invalid owner");
            require(!isOwner[owner], "Owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }
        requiredConfirmations = _requiredConfirmations;
    }

    function submitTransaction(address to, uint256 value) external onlyOwner {
        uint256 transactionId = transactions.length;
        transactions.push(Transaction({
            to: to,
            value: value,
            executed: false,
            confirmations: 0
        }));
        emit TransactionSubmitted(transactionId, to, value);
    }

    function confirmTransaction(uint256 transactionId) 
        external 
        onlyOwner 
        transactionExists(transactionId) 
        notExecuted(transactionId) 
    {
        Transaction storage transaction = transactions[transactionId];
        require(!transaction.isConfirmed[msg.sender], "Transaction already confirmed");

        transaction.isConfirmed[msg.sender] = true;
        transaction.confirmations += 1;

        emit TransactionConfirmed(transactionId, msg.sender);

        if (transaction.confirmations >= requiredConfirmations) {
            executeTransaction(transactionId);
        }
    }

    function executeTransaction(uint256 transactionId) 
        internal 
        transactionExists(transactionId) 
        notExecuted(transactionId) 
    {
        Transaction storage transaction = transactions[transactionId];
        require(transaction.confirmations >= requiredConfirmations, "Cannot execute transaction");

        transaction.executed = true;
        (bool success, ) = transaction.to.call{value: transaction.value}("");
        require(success, "Transaction failed");

        emit TransactionExecuted(transactionId);
    }

    function addOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid owner");
        require(!isOwner[newOwner], "Owner already exists");

        isOwner[newOwner] = true;
        owners.push(newOwner);
        emit OwnerAdded(newOwner);
    }

    function removeOwner(address owner) external onlyOwner {
        require(isOwner[owner], "Not an owner");

        isOwner[owner] = false;
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == owner) {
                owners[i] = owners[owners.length - 1];
                owners.pop();
                break;
            }
        }
        emit OwnerRemoved(owner);
    }

    function changeRequiredConfirmations(uint256 _requiredConfirmations) external onlyOwner {
        require(_requiredConfirmations > 0 && _requiredConfirmations <= owners.length, "Invalid number of required confirmations");
        requiredConfirmations = _requiredConfirmations;
        emit RequiredConfirmationsChanged(_requiredConfirmations);
    }

    receive() external payable {}
}

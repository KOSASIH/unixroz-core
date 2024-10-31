// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BridgeContract {
    address public owner;
    mapping(address => mapping(uint256 => bool)) public lockedTokens; // Track locked tokens
    mapping(address => uint256) public balances; // Track user balances

    event TokensLocked(address indexed user, uint256 amount, uint256 indexed chainId);
    event TokensMinted(address indexed user, uint256 amount, uint256 indexed chainId);
    event TokensUnlocked(address indexed user, uint256 amount, uint256 indexed chainId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Lock tokens on the source chain
    function lockTokens(uint256 amount, uint256 chainId) external {
        require(amount > 0, "Amount must be greater than zero");
        require(!lockedTokens[msg.sender][chainId], "Tokens already locked for this chain");

        // Update the locked tokens mapping
        lockedTokens[msg.sender][chainId] = true;
        balances[msg.sender] += amount;

        emit TokensLocked(msg.sender, amount, chainId);
    }

    // Mint equivalent tokens on the destination chain
    function mintTokens(address user, uint256 amount, uint256 chainId) external onlyOwner {
        require(lockedTokens[user][chainId], "No locked tokens found for this user");

        // Minting logic (this is a placeholder; actual minting would depend on the token standard)
        emit TokensMinted(user, amount, chainId);
    }

    // Unlock tokens on the source chain (in case of failure)
    function unlockTokens(uint256 amount, uint256 chainId) external {
        require(lockedTokens[msg.sender][chainId], "No locked tokens found for this user");

        // Update the locked tokens mapping
        lockedTokens[msg.sender][chainId] = false;
        balances[msg.sender] -= amount;

        emit TokensUnlocked(msg.sender, amount, chainId);
    }

    // Get user balance
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
}

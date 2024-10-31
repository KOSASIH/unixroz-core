// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./templates/escrow.sol";
import "./templates/voting.sol";
import "./templates/identity.sol";

contract Unixroz {
    // State variables
    Escrow[] public escrows;
    Voting public voting;
    Identity public identity;

    // Events
    event EscrowCreated(address indexed buyer, address indexed seller, address indexed arbiter, uint amount);
    event UserRegistered(address indexed user, string name, string email);
    event VoteCasted(address indexed voter, uint proposalIndex);

    // Constructor to initialize contracts
    constructor() {
        voting = new Voting();
        identity = new Identity();
    }

    // Function to create a new escrow
    function createEscrow(address _buyer, address _seller, address _arbiter, uint _amount) external {
        require(_buyer != address(0), "Invalid buyer address");
        require(_seller != address(0), "Invalid seller address");
        require(_arbiter != address(0), "Invalid arbiter address");
        require(_amount > 0, "Amount must be greater than zero");

        Escrow newEscrow = new Escrow(_buyer, _seller, _arbiter, _amount);
        escrows.push(newEscrow);
        emit EscrowCreated(_buyer, _seller, _arbiter, _amount);
    }

    // Function to get the number of escrows created
    function getEscrowCount() external view returns (uint) {
        return escrows.length;
    }

    // Function to register a new user
    function registerUser (string memory _name, string memory _email) external {
        identity.register(_name, _email);
        emit UserRegistered(msg.sender, _name, _email);
    }

    // Function to get user information
    function getUser Info(address _userAddress) external view returns (string memory name, string memory email) {
        return identity.getUser (_userAddress);
    }

    // Function to cast a vote
    function castVote(uint _proposalIndex) external {
        voting.vote(_proposalIndex);
        emit VoteCasted(msg.sender, _proposalIndex);
    }

    // Function to get voting results
    function getVotingResults() external view returns (string memory winnerName, uint winnerVoteCount) {
        return voting.getResults();
    }

    // Function to get the address of the voting contract
    function getVotingContractAddress() external view returns (address) {
        return address(voting);
    }

    // Function to get the address of the identity contract
    function getIdentityContractAddress() external view returns (address) {
        return address(identity);
    }

    // Function to get the address of a specific escrow contract
    function getEscrowAddress(uint index) external view returns (address) {
        require(index < escrows.length, "Invalid escrow index");
        return address(escrows[index]);
    }
}

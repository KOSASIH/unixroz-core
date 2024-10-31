// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Governance {
    struct Proposal {
        string description;
        uint256 voteCount;
        uint256 endTime;
        mapping(address => bool) voters;
        bool executed;
    }

    address public owner;
    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256) public votingPower;

    event ProposalCreated(uint256 indexed proposalId, string description, uint256 endTime);
    event Voted(uint256 indexed proposalId, address indexed voter);
    event ProposalExecuted(uint256 indexed proposalId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier proposalExists(uint256 proposalId) {
        require(proposalId < proposalCount, "Proposal does not exist");
        _;
    }

    modifier notVoted(uint256 proposalId) {
        require(!proposals[proposalId].voters[msg.sender], "Already voted");
        _;
    }

    modifier proposalActive(uint256 proposalId) {
        require(block.timestamp < proposals[proposalId].endTime, "Proposal voting has ended");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setVotingPower(address voter, uint256 power) external onlyOwner {
        votingPower[voter] = power;
    }

    function createProposal(string memory description, uint256 duration) external onlyOwner {
        require(duration > 0, "Duration must be greater than 0");
        uint256 endTime = block.timestamp + duration;

        proposals[proposalCount] = Proposal({
            description: description,
            voteCount: 0,
            endTime: endTime,
            executed: false
        });

        emit ProposalCreated(proposalCount, description, endTime);
        proposalCount++;
    }

    function vote(uint256 proposalId) 
        external 
        proposalExists(proposalId) 
        notVoted(proposalId) 
        proposalActive(proposalId) 
    {
        Proposal storage proposal = proposals[proposalId];
        uint256 power = votingPower[msg.sender];
        require(power > 0, "No voting power");

        proposal.voters[msg.sender] = true;
        proposal.voteCount += power;

        emit Voted(proposalId, msg.sender);
    }

    function executeProposal(uint256 proposalId) 
        external 
        proposalExists(proposalId) 
    {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp >= proposal.endTime, "Proposal voting is still active");
        require(!proposal.executed, "Proposal already executed");
        require(proposal.voteCount > 0, "No votes for proposal");

        proposal.executed = true;

        // Execute the proposal logic here (e.g., change state, transfer funds, etc.)
        // For demonstration, we will just emit an event.
        emit ProposalExecuted(proposalId);
    }
}

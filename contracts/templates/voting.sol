// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Proposal {
        string name;
        uint voteCount;
    }

    mapping(uint => Proposal) public proposals;
    mapping(address => bool) public voters;
    uint public proposalsCount;

    constructor() {
        addProposal("Proposal 1");
        addProposal("Proposal 2");
    }

    function addProposal(string memory _name) private {
        proposals[proposalsCount] = Proposal(_name, 0);
        proposalsCount++;
    }

    function vote(uint _proposalIndex) external {
        require(!voters[msg.sender], "You have already voted");
        require(_proposalIndex < proposalsCount, "Invalid proposal index");

        voters[msg.sender] = true;
        proposals[_proposalIndex].voteCount++;
    }

    function getResults() external view returns (string memory winnerName, uint winnerVoteCount) {
        uint winningVoteCount = 0;
        for (uint i = 0; i < proposalsCount; i++) {
            if (proposals[i].voteCount > winningVoteCount) {
                winningVoteCount = proposals[i].voteCount;
                winnerName = proposals[i].name;
                winnerVoteCount = winningVoteCount;
            }
        }
    }
}

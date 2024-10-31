// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address public buyer;
    address public seller;
    address public arbiter;
    uint256 public amount;
    bool public isCompleted;
    bool public isDisputed;

    event EscrowCreated(address indexed buyer, address indexed seller, uint256 amount);
    event PaymentReleased(address indexed seller, uint256 amount);
    event DisputeRaised(address indexed arbiter);
    event DisputeResolved(address indexed arbiter, address indexed winner);

    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only buyer can call this function");
        _;
    }

    modifier onlySeller() {
        require(msg.sender == seller, "Only seller can call this function");
        _;
    }

    modifier onlyArbiter() {
        require(msg.sender == arbiter, "Only arbiter can call this function");
        _;
    }

    constructor(address _seller, address _arbiter) payable {
        buyer = msg.sender;
        seller = _seller;
        arbiter = _arbiter;
        amount = msg.value;
        isCompleted = false;
        isDisputed = false;

        emit EscrowCreated(buyer, seller, amount);
    }

    function releasePayment() public onlyBuyer {
        require(!isCompleted, "Payment already released");
        require(!isDisputed, "Payment is disputed");

        isCompleted = true;
        payable(seller).transfer(amount);
        emit PaymentReleased(seller, amount);
    }

    function raiseDispute() public onlyBuyer {
        require(!isDisputed, "Dispute already raised");
        isDisputed = true;
        emit DisputeRaised(arbiter);
    }

    function resolveDispute(address winner) public onlyArbiter {
        require(isDisputed, "No dispute to resolve");
        isDisputed = false;
        isCompleted = true;

        payable(winner).transfer(amount);
        emit DisputeResolved(arbiter, winner);
    }

    function getEscrowDetails() public view returns (address, address, address, uint256, bool, bool) {
        return (buyer, seller, arbiter, amount, isCompleted, isDisputed);
    }
}

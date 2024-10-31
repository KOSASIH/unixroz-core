// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address public buyer;
    address public seller;
    address public arbiter;
    uint public amount;
    bool public isCompleted;

    constructor(address _buyer, address _seller, address _arbiter, uint _amount) {
        buyer = _buyer;
        seller = _seller;
        arbiter = _arbiter;
        amount = _amount;
        isCompleted = false;
    }

    function deposit() external payable {
        require(msg.sender == buyer, "Only buyer can deposit");
        require(msg.value == amount, "Incorrect amount");
    }

    function release() external {
        require(msg.sender == arbiter, "Only arbiter can release funds");
        require(!isCompleted, "Escrow already completed");
        payable(seller).transfer(amount);
        isCompleted = true;
    }

    function refund() external {
        require(msg.sender == arbiter, "Only arbiter can refund");
        require(!isCompleted, "Escrow already completed");
        payable(buyer).transfer(amount);
        isCompleted = true;
    }
}

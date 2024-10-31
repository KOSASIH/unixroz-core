// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AutomatedPayment {
    address public payer;
    address public payee;
    uint256 public paymentAmount;
    uint256 public paymentInterval;
    uint256 public lastPaymentTime;
    bool public isActive;

    event PaymentMade(address indexed payee, uint256 amount);
    event PaymentPaused();
    event PaymentResumed();

    modifier onlyPayer() {
        require(msg.sender == payer, "Only payer can call this function");
        _;
    }

    constructor(address _payee, uint256 _paymentAmount, uint256 _paymentInterval) {
        payer = msg.sender;
        payee = _payee;
        paymentAmount = _paymentAmount;
        paymentInterval = _paymentInterval;
        lastPaymentTime = block.timestamp;
        isActive = true;
    }

    function makePayment() public onlyPayer {
        require(isActive, "Payments are paused");
        require(block.timestamp >= lastPaymentTime + paymentInterval, "Payment interval not reached");

        lastPaymentTime = block.timestamp;
        payable(payee).transfer(paymentAmount);
        emit PaymentMade(payee, paymentAmount);
    }

    function pausePayments() public onlyPayer {
        isActive = false;
        emit PaymentPaused();
    }

    function resumePayments() public onlyPayer {
        isActive = true;
        emit PaymentResumed();
    }

    function getPaymentDetails() public view returns (address, address, uint256, uint256, uint256, bool) {
        return (payer, payee, paymentAmount, paymentInterval, lastPaymentTime, isActive);
    }

    // Fallback function to receive Ether
    receive() external payable {}
}

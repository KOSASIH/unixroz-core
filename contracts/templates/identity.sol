// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Identity {
    struct User {
        string name;
        string email;
        bool isRegistered;
    }

    mapping(address => User) public users;

    function register(string memory _name, string memory _email) external {
        require(!users[msg.sender].isRegistered, "User  already registered");
        users[msg.sender] = User(_name, _email, true);
    }

    function getUser (address _userAddress) external view returns (string memory name, string memory email) {
        require(users[_userAddress].isRegistered, "User  not registered");
        return (users[_userAddress].name, users[_userAddress].email);
    }
}

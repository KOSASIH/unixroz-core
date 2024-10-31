// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentityContract {
    struct Identity {
        string name;
        string email;
        bool isVerified;
    }

    mapping(address => Identity) private identities;

    event IdentityRegistered(address indexed user, string name, string email);
    event IdentityVerified(address indexed user);
    event IdentityRevoked(address indexed user);

    function registerIdentity(string memory _name, string memory _email) public {
        require(bytes(identities[msg.sender].name).length == 0, "Identity already registered");
        
        identities[msg.sender] = Identity({
            name: _name,
            email: _email,
            isVerified: false
        });

        emit IdentityRegistered(msg.sender, _name, _email);
    }

    function verifyIdentity(address _user) public {
        require(bytes(identities[_user].name).length != 0, "Identity not registered");
        require(!identities[_user].isVerified, "Identity already verified");

        identities[_user].isVerified = true;
        emit IdentityVerified(_user);
    }

    function revokeIdentity(address _user) public {
        require(identities[_user].isVerified, "Identity not verified");

        identities[_user].isVerified = false;
        emit IdentityRevoked(_user);
    }

    function getIdentity(address _user) public view returns (string memory, string memory, bool) {
        Identity memory identity = identities[_user];
        return (identity.name, identity.email, identity.isVerified);
    }
}

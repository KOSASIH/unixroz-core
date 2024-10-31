// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AssetToken is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => string) private _tokenURIs; // Mapping from token ID to asset URI

    event AssetTokenized(uint256 indexed tokenId, string assetURI, address indexed owner);

    constructor() ERC721("TokenizedAsset", "TKA") {}

    // Function to mint a new asset token
    function mint(string memory assetURI) external onlyOwner {
        uint256 tokenId = nextTokenId;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, assetURI);
        emit AssetTokenized(tokenId, assetURI, msg.sender);
        nextTokenId++;
    }

    // Function to set the token URI
    function _setTokenURI(uint256 tokenId, string memory assetURI) internal {
        require(_exists(tokenId), "Token does not exist");
        _tokenURIs[tokenId] = assetURI;
    }

    // Function to get the token URI
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenURIs[tokenId];
    }

    // Function to transfer ownership of the asset token
    function transferAsset(address to, uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "You do not own this token");
        safeTransferFrom(msg.sender, to, tokenId);
    }
}

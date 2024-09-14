// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract BasicNft is ERC721URIStorage {
    string public constant DEFAULT_TOKEN_URI =
        "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";
    uint256 private s_tokenCounter;

    constructor() ERC721("Naruto", "NAR") {
        s_tokenCounter = 0;
    }

    function mintDefaultNft() public returns (uint) {
        _safeMint(msg.sender, s_tokenCounter);
        _setTokenURI(s_tokenCounter, DEFAULT_TOKEN_URI); 
        s_tokenCounter = s_tokenCounter + 1;
        return s_tokenCounter;
    }

    function mintNft(string memory tokenURI) public returns (uint) {
        _safeMint(msg.sender, s_tokenCounter);
        _setTokenURI(s_tokenCounter, tokenURI); 
        s_tokenCounter = s_tokenCounter + 1;
        return s_tokenCounter;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }


    modifier onlyOwner(uint256 tokenId) {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this token");
        _;
    }
}

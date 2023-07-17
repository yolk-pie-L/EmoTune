// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTItem is ERC721URIStorage{

    using Counters for Counters.Counter;
    Counters.Counter private tokenId;

    event Mint(address indexed to, uint tokenId, string tokenURI);

    constructor() ERC721("Emotional Music", "EM") {

    }

    function mintNFT(string memory _tokenURI) public{
        require(bytes(_tokenURI).length > 0,"The _tokenURI must be have");
        tokenId.increment();
        uint newTokenId = tokenId.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        emit Mint(msg.sender, newTokenId, _tokenURI);
    }

}
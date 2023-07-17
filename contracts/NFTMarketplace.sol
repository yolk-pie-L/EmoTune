// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract NFTMarketplace is IERC721Receiver{

    using SafeMath for uint256;

    uint marketplaceRatio;
    address owner;

    mapping(uint256 => NFTListing) public listings;

    struct NFTListing {
        address seller;
        uint256 price;
    }

    constructor(){
        marketplaceRatio = 1;
        owner = msg.sender;
    }

    function listNFT(address nftAddress, uint256 tokenId, uint256 price) external {
        require(IERC721(nftAddress).ownerOf(tokenId) == msg.sender, "You do not own this NFT");
        require(listings[tokenId].seller == address(0), "this item has been listed");

        IERC721(nftAddress).safeTransferFrom(msg.sender, address(this), tokenId);
        listings[tokenId] = NFTListing({
            seller: msg.sender,
            price: price
        });
    }

    function buyNFT(address nftAddress, uint256 tokenId) external payable {
        require(listings[tokenId].seller != address(0), "NFT is not listed for sale");
        require(listings[tokenId].price == msg.value, "Incorrect payment amount");

        address seller = listings[tokenId].seller;
        uint256 salePrice = listings[tokenId].price;
        uint256 feeAmount = salePrice.mul(marketplaceRatio).div(100);

        payable(seller).transfer(salePrice.sub(feeAmount));
        IERC721(nftAddress).safeTransferFrom(address(this), msg.sender, tokenId);
        delete listings[tokenId];
    }

    function withdrawNFT(address nftAddress, uint256 tokenId) public {
        require(listings[tokenId].seller == msg.sender, "You do not own this NFT or it is not listed for sale");
        delete listings[tokenId];
        IERC721(nftAddress).safeTransferFrom(address(this), msg.sender, tokenId);
    }

    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external pure override returns (bytes4) {
      return this.onERC721Received.selector;
    }

    function withdrawMoney() external{
        require(msg.sender == owner, "you are not owner");
        uint balance = address(this).balance;
        payable(owner).transfer(balance);
    }

    function setMarketplaceRatio(uint _ratio) external{
        require(msg.sender == owner);
        marketplaceRatio = _ratio;
    }
}
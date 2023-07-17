import React, { useState } from "react";
import { ethers } from "ethers";

export function BuyNFTButton({ signer, NFTMarketplace, NFTItem, tokenId }) {
  const handleSubmit = async (NFTMarketplace, NFTItem, tokenId) => {
    console.log("start BUY");
    const tx = await NFTMarketplace.buyNFT(NFTItem.address, tokenId);
    const receipt = await tx.wait();
    console.log("sell", receipt.status);
  };

  return (
    <div>
      <button
        className="custom-button"
        onClick={() => handleSubmit(NFTMarketplace, NFTItem, tokenId)}
      >
        BUY
      </button>
    </div>
  );
}

export default BuyNFTButton;

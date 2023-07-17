import React, { useState } from "react";
import { ethers } from "ethers";

export function WithdrawNFTButton({
  signer,
  NFTMarketplace,
  NFTItem,
  tokenId,
}) {
  const handleSubmit = async (NFTMarketplace, NFTItem, tokenId) => {
    console.log("start withdraw");
    const tx = await NFTMarketplace.withdrawNFT(NFTItem.address, tokenId);
    const receipt = await tx.wait();
    console.log("withdraw", receipt.status);
  };

  return (
    <div>
      <button
        className="custom-button"
        onClick={() => handleSubmit(NFTMarketplace, NFTItem, tokenId)}
      >
        WITHDRAW
      </button>
    </div>
  );
}

export default WithdrawNFTButton;

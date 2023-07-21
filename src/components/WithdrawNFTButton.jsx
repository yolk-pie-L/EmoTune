import React, { useState } from "react";
import { ethers } from "ethers";
import NFTItemArtifact from "../contracts/NFTItem.json";
import NFTMarketplaceArtifact from "../contracts/NFTMarketplace.json";
import NFTItemAddress from "../contracts/NFTItem-contract-address.json";
import NFTMarketplaceAddress from "../contracts/NFTMarketplace-contract-address.json";

export function WithdrawNFTButton({ token_id, isSelling}) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const NFTItem = new ethers.Contract(
    NFTItemAddress.address,
    NFTItemArtifact.abi,
    provider.getSigner(0)
  );
  const NFTMarketplace = new ethers.Contract(
    NFTMarketplaceAddress.address,
    NFTMarketplaceArtifact.abi,
    provider.getSigner(0)
  );

  const handleSubmit = async () => {
    console.log("start withdraw");
    const tx = await NFTMarketplace.withdrawNFT(NFTItem.address, token_id);
    const receipt = await tx.wait();
    console.log("withdraw", receipt.status);
  };

  return (
    <div>
      <button
        className={`px-4 py-2 rounded ${
          isSelling != 0 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
          }`}
          disabled={ isSelling == 0}
          onClick={handleSubmit}
      >
        {isSelling != 0 ? 'WithDraw' : 'Inactive'}
      </button>
    </div>
  );
}

export default WithdrawNFTButton;

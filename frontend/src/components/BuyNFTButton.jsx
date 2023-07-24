import React, { useState } from "react";
import { ethers } from "ethers";
import NFTItemArtifact from "../contracts/NFTItem.json";
import NFTMarketplaceArtifact from "../contracts/NFTMarketplace.json";
import NFTItemAddress from "../contracts/NFTItem-contract-address.json";
import NFTMarketplaceAddress from "../contracts/NFTMarketplace-contract-address.json";
import {Button} from "antd";
export function BuyNFTButton({
  tokenId,
  price,
}) {
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
    console.log("start BUY");
    const tx = await NFTMarketplace.buyNFT(NFTItem.address, tokenId, {
      value: price,
    });
    const receipt = await tx.wait();
    console.log("sell", receipt.status);
  };

  return (
    <div>
      <Button
        onClick={handleSubmit}
      > Buy</Button>
    </div>
  );
}

export default BuyNFTButton;

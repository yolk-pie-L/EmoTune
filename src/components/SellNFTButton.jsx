import React, { useState } from "react";
import { ethers } from "ethers";
import NFTItemArtifact from "../contracts/NFTItem.json";
import NFTMarketplaceArtifact from "../contracts/NFTMarketplace.json";
import NFTItemAddress from "../contracts/NFTItem-contract-address.json";
import NFTMarketplaceAddress from "../contracts/NFTMarketplace-contract-address.json";
export function SellNFTButton({token_id,isSelling}) {
  const [inputValue, setInputValue] = useState("");
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
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = async () => {
    if (isNaN(inputValue) || !Number.isInteger(Number(inputValue))) {
      alert("you should input an integer");
    }
    console.log("start sell");
    console.log(NFTItem.address,
      token_id,
      inputValue)
    const tx1 = await NFTItem.approve(NFTMarketplace.address, token_id);
    const tx = await NFTMarketplace.listNFT(
      NFTItem.address,
      token_id,
      inputValue
    );
    const receipt = await tx.wait();
    console.log("sell", receipt.status);
  };

  return (
    <div>
      <input
        type="text"
        id="inputField"
        disabled = {isSelling != 0}
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        className={`px-4 py-2 rounded ${
          isSelling == 0 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
          }`}
          disabled={isSelling != 0}
          onClick={handleSubmit}
      >
        {isSelling == 0 ? 'Sell' : 'Inactive'}
      </button>

    </div>
  );
}

export default SellNFTButton;

import React, { useState } from "react";
import { ethers } from "ethers";

export function SellNFTButton({ signer, NFTMarketplace, NFTItem, tokenId }) {
  const [inputValue, setInputValue] = useState("");
  tokenId = 2;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (NFTMarketplace, NFTItem, tokenId) => {
    if (isNaN(inputValue) || !Number.isInteger(Number(inputValue))) {
      alert("you should input an integer");
    }
    console.log("start sell");
    const tx1 = await NFTItem.approve(NFTMarketplace.address, tokenId);
    const tx = await NFTMarketplace.listNFT(
      NFTItem.address,
      tokenId,
      inputValue
    );
    const receipt = await tx.wait();
    console.log("sell", receipt.status);
  };

  return (
    <div>
      <h2>Sell Your NFT</h2>

      <label htmlFor="inputField"> price </label>
      <input
        type="text"
        id="inputField"
        value={inputValue}
        onChange={handleInputChange}
      />

      <br />
      <br />

      <button
        className="custom-button"
        onClick={() => handleSubmit(NFTMarketplace, NFTItem, tokenId)}
      >
        SELL
      </button>
    </div>
  );
}

export default SellNFTButton;

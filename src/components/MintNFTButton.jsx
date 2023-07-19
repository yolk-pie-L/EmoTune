import React, { useState } from "react";
import { ethers } from "ethers";

export function MintNFTButton({ signer, NFTItem }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (NFTItem) => {
    console.log("start mint");
    const tx = await NFTItem.mintNFT(inputValue);
    const receipt = await tx.wait();
    const events = NFTItem.interface.parseLog(receipt.logs[0]);
    console.log("交易的事件:", events);
    const param1 = events.args[0];
    const param2 = events.args[1];
    const param3 = events.args[2]._hex;
    console.log("事件参数:", param1, param2, parseInt(param3, 16));
  };

  return (
    <div>
      <h2>Mint Your NFT</h2>

      <label htmlFor="inputField">URI: </label>
      <input
        type="text"
        id="inputField"
        value={inputValue}
        onChange={handleInputChange}
      />

      <br />
      <br />

      <button className="custom-button" onClick={() => handleSubmit(NFTItem)}>
        MINT
      </button>
    </div>
  );
}

export default MintNFTButton;

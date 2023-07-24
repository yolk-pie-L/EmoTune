import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import NFTItemArtifact from "../contracts/NFTItem.json";
import NFTMarketplaceArtifact from "../contracts/NFTMarketplace.json";
import NFTItemAddress from "../contracts/NFTItem-contract-address.json";
import NFTMarketplaceAddress from "../contracts/NFTMarketplace-contract-address.json";
import { Button, Space } from 'antd';
export function MintNFTButton({token_id, mood_id, authentic}) {
  const [inputValue, setInputValue] = useState('');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const NFTItem = new ethers.Contract(
    NFTItemAddress.address,
    NFTItemArtifact.abi,
    provider.getSigner(0)
  );
  const handleSubmit = async () => {
    const response = await axios.post(
      "https://ve8x4frvd8.execute-api.us-east-1.amazonaws.com/default/getIPFSURI",
      {
        mood_id: mood_id
      },
      {
        headers: {'Authorization': authentic}
      }
    );
    const inputValueTemp = response.data.cid;
    setInputValue(inputValueTemp); // 更新 input value
    console.log("start mint");
    const tx = await NFTItem.mintNFT(inputValueTemp);
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
      <Button
        disabled={token_id != null}
        onClick={handleSubmit}
      >Mint</Button>
      {/* <button
        className={`px-4 py-2 rounded ${
        token_id == null ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
        }`}
        disabled={token_id != null}
        onClick={handleSubmit}
        >
        {token_id == null ? 'Click Me to MINT' : 'Inactive'}
        </button> */}
    </div>
  );
}

export default MintNFTButton;

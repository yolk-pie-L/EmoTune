import React, { useState } from "react";
import { ethers } from "ethers";
import NFTItemArtifact from "../contracts/NFTItem.json";
import NFTMarketplaceArtifact from "../contracts/NFTMarketplace.json";
import NFTItemAddress from "../contracts/NFTItem-contract-address.json";
import NFTMarketplaceAddress from "../contracts/NFTMarketplace-contract-address.json";
import { InfoCircleOutlined, PayCircleOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import { Button, Space } from 'antd';

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
      
    <Space direction="vertical">
      <Space.Compact style={{ width: '220px' }}>
        <Input
          placeholder="Enter your price"
          prefix={<PayCircleOutlined className="site-form-item-icon" />}
          suffix={
              <Tooltip title="Only support integer">
              <InfoCircleOutlined
                style={{
                  color: 'rgba(0,0,0,.45)',
                }}
              />
            </Tooltip>
          }
          value={inputValue}
          onChange={handleInputChange}
          disabled = {isSelling != 0}
        />
        <Button 
          disabled={isSelling != 0}
          onClick={handleSubmit}>Sell</Button>
      </Space.Compact>
    </Space>
    </div>
  );
}

export default SellNFTButton;

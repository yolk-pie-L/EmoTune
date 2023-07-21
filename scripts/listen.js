const { ethers } = require("ethers");
const NFTItemArtifact = require("./contracts/NFTItem.json");
const NFTItemAddress = require("./contracts/NFTItem-contract-address.json");
const NFTMarketplaceArtifact = require("./contracts/NFTMarketplace.json");
const NFTMarketplaceAddress = require("./contracts/NFTMarketplace-contract-address.json");
const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mumbai.g.alchemy.com/v2/6EQ5JOEZriJd4-_XpVmp9ZR3T3_dTPld"
);
const NFTItem = new ethers.Contract(
  NFTItemAddress.address,
  NFTItemArtifact.abi,
  provider
);
const NFTMarketplace = new ethers.Contract(
  NFTMarketplaceAddress.address,
  NFTMarketplaceArtifact.abi,
  provider
);

console.log("start listening....");
NFTItem.on("Mint", (to, tokenId, tokenURI) => {
  console.log(
    "Mint: to",
    to,
    "tokenId",
    parseInt(tokenId._hex),
    "tokenURI",
    tokenURI
  );

  const url =
    "https://ve8x4frvd8.execute-api.us-east-1.amazonaws.com/default/newMint"; // 替换为您要发送 POST 请求的 URL

  const data = {
    token_id: parseInt(tokenId._hex),
    ipfs_uri: tokenURI,
    owner_add: to,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "3nd7aIxWZiwSj13sidjiHSUoddsasdad2wa",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log("Mint post successfully", response.status);
    })
    .catch((error) => {
      console.error("Error sending POST request:", error);
    });
});

NFTMarketplace.on("BuyNFT", (tokenId, _buyer) => {
  console.log("BuyNFT tokenId", parseInt(tokenId._hex), "buyer", _buyer);

  const url =
    "https://ve8x4frvd8.execute-api.us-east-1.amazonaws.com/default/newBuy"; // 替换为您要发送 POST 请求的 URL

  const data = {
    token_id: parseInt(tokenId._hex),
    buyer_add: _buyer,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "3nd7aIxWZiwSj13sidjiHSUoddsasdad2wa",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log("Buy post successfully", response.status);
    })
    .catch((error) => {
      console.error("Error sending POST request:", error);
    });
});

NFTMarketplace.on("ListNFT", (tokenId, _price) => {
  console.log(
    "Sell",
    "tokenId",
    parseInt(tokenId._hex),
    "price",
    parseInt(_price._hex)
  );

  const url =
    "https://ve8x4frvd8.execute-api.us-east-1.amazonaws.com/default/newSell"; // 替换为您要发送 POST 请求的 URL

  const data = {
    token_id: parseInt(tokenId._hex),
    price: parseInt(_price._hex),
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "3nd7aIxWZiwSj13sidjiHSUoddsasdad2wa",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log("Sell post successfully", response.status);
    })
    .catch((error) => {
      console.error("Error sending POST request:", error);
    });
});

NFTMarketplace.on("WithdrawNFT", (tokenId) => {
  console.log("WithdrawNFT");
  console.log("tokenId", parseInt(tokenId._hex));

  const url =
    "https://ve8x4frvd8.execute-api.us-east-1.amazonaws.com/default/newWithdraw"; // 替换为您要发送 POST 请求的 URL

  const data = {
    token_id: parseInt(tokenId._hex),
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "3nd7aIxWZiwSj13sidjiHSUoddsasdad2wa",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log("Withdraw post successfully", response.status);
    })
    .catch((error) => {
      console.error("Error sending POST request:", error);
    });
});

const { ethers } = require("ethers");
const NFTItemArtifact = require("./contracts/NFTItem.json");
const NFTItemAddress = require("./contracts/NFTItem-contract-address.json");
const NFTMarketplaceArtifact = require("./contracts/NFTMarketplace.json");
const NFTMarketplaceAddress = require("./contracts/NFTMarketplace-contract-address.json");
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
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

console.log("start listening for mint.....");
NFTItem.on("Mint", (to, tokenId, tokenURI) => {
  console.log("Mint");
  console.log(
    "to",
    to,
    "tokenId",
    parseInt(tokenId._hex),
    "tokenURI",
    tokenURI
  );

  // const url = "https://example.com/api/endpoint"; // 替换为您要发送 POST 请求的 URL

  // const data = {
  //   token_id: parseInt(tokenId._hex),
  //   ipfs_uri: tokenURI,
  //   owner_add: to,
  // };

  // fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => response.json())
  //   .then((result) => {
  //     console.log("POST request completed:", result);
  //   })
  //   .catch((error) => {
  //     console.error("Error sending POST request:", error);
  //   });

  console.log("");
});

NFTMarketplace.on("BuyNFT", (tokenId, _buyer) => {
  console.log("BuyNFT");
  console.log("tokenId", parseInt(tokenId._hex), "buyer", _buyer);

  //   const url = "https://example.com/api/endpoint"; // 替换为您要发送 POST 请求的 URL

  //   const data = {
  //     token_id: parseInt(tokenId._hex),
  //     buyer: _buyer
  //   };

  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("POST request completed:", result);
  //     })
  //     .catch((error) => {
  //       console.error("Error sending POST request:", error);
  //     });

  console.log("");
});

NFTMarketplace.on("ListNFT", (tokenId, _price) => {
  console.log("ListNFT");
  console.log(
    "tokenId",
    parseInt(tokenId._hex),
    "price",
    parseInt(_price._hex)
  );

  //   const url = "https://example.com/api/endpoint"; // 替换为您要发送 POST 请求的 URL

  //   const data = {
  //     token_id: parseInt(tokenId._hex),
  //     price: parseInt(_price._hex),
  //   };

  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("POST request completed:", result);
  //     })
  //     .catch((error) => {
  //       console.error("Error sending POST request:", error);
  //     });

  console.log("");
});

NFTMarketplace.on("WithdrawNFT", (tokenId) => {
  console.log("WithdrawNFT");
  console.log("tokenId", parseInt(tokenId._hex));

  //   const url = "https://example.com/api/endpoint"; // 替换为您要发送 POST 请求的 URL

  //   const data = {
  //     token_id: parseInt(tokenId._hex)
  //   };

  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("POST request completed:", result);
  //     })
  //     .catch((error) => {
  //       console.error("Error sending POST request:", error);
  //     });

  console.log("");
});

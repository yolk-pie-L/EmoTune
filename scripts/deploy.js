const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const NFTItem = await ethers.deployContract("NFTItem");
  const NFTMarketplace = await ethers.deployContract("NFTMarketplace");

  console.log("NFTItem address:", NFTItem.address);
  console.log("NFTMarketplace address:", NFTMarketplace.address);

  await saveFrontendFiles(NFTItem, "NFTItem");
  await saveFrontendFiles(NFTMarketplace, "NFTMarketplace");
}

async function saveFrontendFiles(myContract, contractName) {
  const fs = require("fs");
  const contractsDir = path.join(
    __dirname,
    "..",
    "frontend",
    "src",
    "contracts"
  );

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, contractName + "-contract-address.json"),
    JSON.stringify({ address: myContract.address }, undefined, 2)
  );

  const myContractArtifact = artifacts.readArtifactSync(contractName);

  fs.writeFileSync(
    path.join(contractsDir, contractName + ".json"),
    JSON.stringify(myContractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

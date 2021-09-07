const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // deploy library
  const Con01 = await ethers.getContractFactory("BnbStaking");
  console.log('Deploying ...');
  const con01 = await Con01.deploy();
  console.log("the contract address:", con01.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })

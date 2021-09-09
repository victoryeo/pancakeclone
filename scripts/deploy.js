const { ethers } = require('hardhat');

async function main() {
  const [deployer, minter] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log("Minter account:", minter.address);

  // deploy wbnb
  const WBNB = await ethers.getContractFactory("WBNB");
  console.log('Deploying ...');
  const wbnb = await WBNB.deploy();
  console.log("the contract address:", wbnb.address);
  
  // deploy cake
  const CakeToken = await ethers.getContractFactory("CakeToken");
  console.log('Deploying ...');
  const caketoken = await CakeToken.deploy();
  console.log("the contract address:", caketoken.address);

  // deploy staking
  const BnbStaking = await ethers.getContractFactory("BnbStaking");
  console.log('Deploying ...');
  const bnbstaking = await BnbStaking.deploy(wbnb.address, caketoken.address,
    1000,10,1010, deployer.address, wbnb.address);
  console.log("the contract address:", bnbstaking.address);

  // deploy erc20
  const PancakeERC20 = await ethers.getContractFactory("PancakeERC20");
  console.log('Deploying ...');
  const pancakeerc20 = await PancakeERC20.deploy();
  console.log("the contract address:", pancakeerc20.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })

const { ethers } = require('hardhat');

async function main() {
  const [deployer, minter] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log("Minter account:", minter.address);

  // deploy wbnb
  const WBNB = await ethers.getContractFactory("WBNB");
  console.log('Deploying WBNB ...');
  const wbnb = await WBNB.deploy();
  console.log("the contract address:", wbnb.address);
  
  // deploy cake
  const CakeToken = await ethers.getContractFactory("CakeToken");
  console.log('Deploying CakeToken ...');
  const caketoken = await CakeToken.deploy();
  console.log("the contract address:", caketoken.address);

  // deploy staking
  const BnbStaking = await ethers.getContractFactory("BnbStaking");
  console.log('Deploying BnbStaking ...');
  const bnbstaking = await BnbStaking.deploy(wbnb.address, caketoken.address,
    1000,10,1010, deployer.address, wbnb.address);
  console.log("the contract address:", bnbstaking.address);

  // deploy erc20
  const PancakeERC20 = await ethers.getContractFactory("PancakeERC20");
  console.log('Deploying PancakeERC20 ...');
  const pancakeerc20 = await PancakeERC20.deploy();
  console.log("the contract address:", pancakeerc20.address);

  // deploy SyrupBar
  const SyrupBar = await ethers.getContractFactory("SyrupBar");
  console.log('Deploying SyrupBar ...');
  const syrupbar = await SyrupBar.deploy(caketoken.address);
  console.log("the contract address:", syrupbar.address);

  // deploy SousChef
  const SousChef = await ethers.getContractFactory("SousChef");
  console.log('Deploying SousChef ...');
  const souschef = await SousChef.deploy(syrupbar.address, 40, 300, 400);
  console.log("the contract address:", souschef.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })

import "@nomiclabs/hardhat-waffle";
import { task } from "hardhat/config";

const { mnemonic } = require('./secrets.json');

// see https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: {
    version: "0.8.4",
    evmVersion: "london"
  },
  networks: {
    development: {
      url: "http://127.0.0.1:9545"
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    },
  },
  paths: {
    sources: "./src/contracts",
    tests: "./src/contracts/test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

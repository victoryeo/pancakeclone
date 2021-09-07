require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
    networks: {
    development: {
      url: "http://127.0.0.1:9545"
    },
  },
  paths: {
    sources: "./src/contracts",
    tests: "./src/contracts/test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

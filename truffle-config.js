module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*",
      gas: 100000000,
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './build/contracts/',
  // Configure your compilers
  compilers: {
      solc: {
          version: '0.8.0',
          settings: { // See the solidity docs for advice about optimization and evmVersion
              optimizer: {
                  enabled: true,
                  runs: 100,
              },
              evmVersion: 'byzantium',
          },
      },
  },  
};

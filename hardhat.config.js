require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    hardhat: {
      chainId: 31337
    },
    sepolia: {
      url: process.env.SEPOLIA_URL || "https://1rpc.io/sepolia",
      accounts: process.env.PASS ? [process.env.PASS] : [],
    },
    goerli: {
      url: process.env.GOERLI_URL || "https://goerli.infura.io/v3/YOUR-PROJECT-ID",
      accounts: process.env.PASS ? [process.env.PASS] : [],
    }
  }
};

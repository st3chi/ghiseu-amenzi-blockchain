import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import dotenv from "dotenv";

dotenv.config();

export default {
  plugins: [hardhatEthers],
  solidity: "0.8.24",
  networks: {
    localhost: {
      type: "http",
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    hardhat: {
      type: "edr-simulated",
      chainId: 31337
    },
    sepolia: {
      type: "http",
      url: process.env.SEPOLIA_URL || "https://1rpc.io/sepolia",
      accounts: process.env.PASS ? [process.env.PASS] : [],
    },
    goerli: {
      type: "http",
      url: process.env.GOERLI_URL || "https://goerli.infura.io/v3/YOUR-PROJECT-ID",
      accounts: process.env.PASS ? [process.env.PASS] : [],
    }
  }
};

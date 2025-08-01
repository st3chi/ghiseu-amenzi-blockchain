const {
  Aquarius,
  ConfigHelper,
} = require("@oceanprotocol/lib");
const ethers = require("ethers");

async function oceanConfig() {
  // Folosește Sepolia testnet
  const provider = new ethers.providers.JsonRpcProvider(
    "https://1rpc.io/sepolia"
  );
  
  // Folosește cheia privată din .env
  const publisherAccount = new ethers.Wallet(
    "369915e25927de12f8ee2c4ac456b018f6407cd300bc3fce94528a9ee39dd4a0", 
    provider
  );

  // Configurație pentru Sepolia (chainId 11155111)
  let oceanConfig = new ConfigHelper().getConfig(11155111);
  const aquarius = new Aquarius(oceanConfig?.metadataCacheUri);

  oceanConfig = {
    ...oceanConfig,
    publisherAccount: publisherAccount,
    consumerAccount: publisherAccount,
    aquarius: aquarius,
  };

  return oceanConfig;
}

module.exports = {
  oceanConfig,
};

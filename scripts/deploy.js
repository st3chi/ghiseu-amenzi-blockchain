import { network } from "hardhat";

async function main() {
  const { ethers } = await network.create();
  const signers = await ethers.getSigners();
  if (signers.length === 0) {
    throw new Error("No signer available for deployment. Configure accounts for Sepolia in hardhat.config.js or via environment variables.");
  }

  const owner = signers[0];
  const Contract = await ethers.getContractFactory("GhiseuAmenzi");
  const contract = await Contract.connect(owner).deploy();

  await contract.waitForDeployment();

  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 
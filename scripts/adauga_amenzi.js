const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // Adresa contractului (actualizează dacă e nevoie)
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  // ABI-ul contractului
  const abi = JSON.parse(fs.readFileSync("./frontend/abi.json")).abi;

  // Conectare la node local
  const [admin] = await ethers.getSigners();
  const contract = new ethers.Contract(contractAddress, abi, admin);

  // Lista de amenzi prestabilite
  const amenzi = [
    { id: "AMZ001", suma: "0.01" },
    { id: "AMZ002", suma: "0.02" },
    { id: "AMZ003", suma: "0.03" }
  ];

  for (const amenda of amenzi) {
    const tx = await contract.adaugaAmenda(amenda.id, ethers.utils.parseEther(amenda.suma));
    await tx.wait();
    console.log(`Amenda ${amenda.id} adăugată cu suma ${amenda.suma} ETH.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

let contract;
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // ← adaugă adresa reală
const abi = []; // ← se va popula din abi.json

window.onload = async () => {
  if (window.ethereum) {
    // Do not auto-connect wallet on load, just prepare contract ABI for later use
    const response = await fetch("abi.json");
    const abiJson = await response.json();
    window.ghiseuAbi = abiJson.abi || abiJson; // support both {abi: [...]} and [...] formats
  } else {
    alert("Instalează Metamask pentru a continua.");
  }
};

async function adaugaAmenda() {
  if (!window.ethereum) return alert("Metamask nu este disponibil.");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  if (!window.ghiseuAbi) {
    const response = await fetch("abi.json");
    window.ghiseuAbi = (await response.json()).abi;
  }
  const contract = new ethers.Contract(contractAddress, window.ghiseuAbi, signer);
  const idInput = document.getElementById("idAdd");
  const sumaInput = document.getElementById("sumaAdd");
  const id = idInput.value;
  const suma = sumaInput.value;
  const tx = await contract.adaugaAmenda(id, ethers.utils.parseEther(suma));
  await tx.wait();
  alert("Amenda adăugată!");
  idInput.value = "";
  sumaInput.value = "";
}

async function platesteAmenda() {
  if (!window.ethereum) return alert("Metamask nu este disponibil.");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  if (!window.ghiseuAbi) {
    const response = await fetch("abi.json");
    window.ghiseuAbi = (await response.json()).abi;
  }
  const contract = new ethers.Contract(contractAddress, window.ghiseuAbi, signer);
  const idInput = document.getElementById("idPlateste");
  const sumaInput = document.getElementById("sumaPlateste");
  const id = idInput.value;
  const suma = sumaInput.value;
  const tx = await contract.platesteAmenda(id, { value: ethers.utils.parseEther(suma) });
  await tx.wait();
  alert("Amenda plătită!");
  idInput.value = "";
  sumaInput.value = "";
}

async function verificaStatus() {
  if (!window.ethereum) return alert("Metamask nu este disponibil.");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  if (!window.ghiseuAbi) {
    const response = await fetch("abi.json");
    window.ghiseuAbi = (await response.json()).abi;
  }
  const contract = new ethers.Contract(contractAddress, window.ghiseuAbi, signer);
  const idInput = document.getElementById("idVerifica");
  const id = idInput.value;
  const status = await contract.verificaStatus(id);
  document.getElementById("statusResult").innerText = status ? "✅ Plătită" : "❌ Neplătită";
  idInput.value = "";
}

async function connectWallet() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const address = await signer.getAddress();
    document.getElementById("walletAddress").innerText = `Conectat: ${address}`;
    document.getElementById("connectBtn").innerText = "✅ Conectat";
  } else {
    alert("Instalează Metamask pentru a continua.");
  }
}

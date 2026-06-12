import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import './App.css';
import abiData from './abi.json';

const contractAddress = "0xd61361cD7EE702f627459a32220A9ddaB8d5C2e2"; // Sepolia (nou deploy)
const localContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Localhost - actualizează cu adresa reală

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState(null);
  
  // State pentru formularele de amenzi
  const [idAdd, setIdAdd] = useState('');
  const [sumaAdd, setSumaAdd] = useState('');
  const [idPlateste, setIdPlateste] = useState('');
  const [sumaPlateste, setSumaPlateste] = useState('');
  const [idVerifica, setIdVerifica] = useState('');
  const [statusResult, setStatusResult] = useState('');
  const [allAmendments, setAllAmendments] = useState([]);
  const [listError, setListError] = useState('');
  const [showAmendments, setShowAmendments] = useState(false);
  
  // State pentru informații despre rețea
  const [networkInfo, setNetworkInfo] = useState('');
  
  // State pentru Ocean Protocol - crearea de dataset
  const [titluDataset, setTitluDataset] = useState('');
  const [descriereDataset, setDescriereDataset] = useState('');
  const [autorDataset, setAutorDataset] = useState('');
  const [dataPublicarii, setDataPublicarii] = useState('');
  const [idAmendaDataset, setIdAmendaDataset] = useState('');
  const [sumaAmendaDataset, setSumaAmendaDataset] = useState('');
  const [didInput, setDidInput] = useState('');
  const [oceanDataset, setOceanDataset] = useState('');
  const [oceanLink, setOceanLink] = useState('#');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Verifică rețeaua actuală
        const network = await provider.getNetwork();
        console.log('Current network:', network);
        
        // Acceptă atât Sepolia (11155111) cât și Hardhat local (31337)
        const supportedNetworks = [11155111, 31337]; // Sepolia și Hardhat local
        
        if (!supportedNetworks.includes(network.chainId)) {
          // Încearcă să schimbe la Sepolia prima dată
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xAA36A7' }], // 11155111 în hex (Sepolia)
            });
          } catch (switchError) {
            // Dacă Sepolia nu există, o adaugă
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0xAA36A7',
                  chainName: 'Sepolia Test Network',
                  nativeCurrency: {
                    name: 'SepoliaETH',
                    symbol: 'ETH',
                    decimals: 18
                  },
                  rpcUrls: ['https://1rpc.io/sepolia'],
                  blockExplorerUrls: ['https://sepolia.etherscan.io/']
                }]
              });
            } else {
              // Dacă nu poate schimba la Sepolia, încearcă localhost
              try {
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0x7A69' }], // 31337 în hex (Hardhat local)
                });
              } catch (localSwitchError) {
                if (localSwitchError.code === 4902) {
                  await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                      chainId: '0x7A69',
                      chainName: 'Hardhat Local',
                      nativeCurrency: {
                        name: 'ETH',
                        symbol: 'ETH',
                        decimals: 18
                      },
                      rpcUrls: ['http://127.0.0.1:8545'],
                      blockExplorerUrls: []
                    }]
                  });
                } else {
                  throw localSwitchError;
                }
              }
            }
          }
        }
        
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        setWalletAddress(address);
        setIsConnected(true);
        
        // Detectează rețeaua după conectare
        const finalNetwork = await provider.getNetwork();
        let networkName = '';
        let contractAddr = contractAddress; // Default la Sepolia
        
        if (finalNetwork.chainId === 11155111) {
          networkName = 'Sepolia Testnet';
          contractAddr = contractAddress; // Adresa din Sepolia
        } else if (finalNetwork.chainId === 31337) {
          networkName = 'Hardhat Local';
          contractAddr = localContractAddress; // Folosește adresa locală
        }
        
        setNetworkInfo(networkName);
        console.log(`Connected to ${networkName} with contract at ${contractAddr}`);
        
        const code = await provider.getCode(contractAddr);
        if (!code || code === '0x' || code === '0x0') {
          throw new Error(`Contractul nu este deployat pe rețeaua ${networkName} la adresa ${contractAddr}. Verifică rețeaua și adresa contractului.`);
        }
        
        // Creează instanța contractului
        const contractInstance = new ethers.Contract(contractAddr, abiData.abi, signer);
        setContract(contractInstance);
        
      } catch (error) {
        console.error("Eroare la conectarea wallet-ului:", error);
        alert("Eroare la conectarea wallet-ului!");
      }
    } else {
      alert("Instalează MetaMask pentru a continua.");
    }
  };

  const adaugaAmenda = async () => {
    if (!contract) {
      alert("Conectează wallet-ul mai întâi!");
      return;
    }
    
    try {
      const tx = await contract.adaugaAmenda(idAdd, ethers.utils.parseEther(sumaAdd));
      await tx.wait();
      alert("Amenda adăugată!");
      setIdAdd('');
      setSumaAdd('');
    } catch (error) {
      console.error("Eroare la adăugarea amenzi:", error);
      alert("Eroare la adăugarea amenzi!");
    }
  };

  const platesteAmenda = async () => {
    if (!contract) {
      alert("Conectează wallet-ul mai întâi!");
      return;
    }
    
    try {
      const tx = await contract.platesteAmenda(idPlateste, { 
        value: ethers.utils.parseEther(sumaPlateste) 
      });
      await tx.wait();
      alert("Amenda plătită!");
      setIdPlateste('');
      setSumaPlateste('');
    } catch (error) {
      console.error("Eroare la plata amenzi:", error);
      alert("Eroare la plata amenzi!");
    }
  };

  const verificaStatus = async () => {
    if (!contract) {
      alert("Conectează wallet-ul mai întâi!");
      return;
    }
    
    if (!idVerifica || idVerifica.trim() === '') {
      alert("Introdu un ID de amendă valid înainte de verificare.");
      return;
    }

    try {
      const network = await contract.provider.getNetwork();
      const code = await contract.provider.getCode(contract.address);
      console.log('Verificare amendă', { idVerifica, contractAddress: contract.address, network, code });

      if (!code || code === '0x' || code === '0x0') {
        setStatusResult('❌ Contractul nu este deployat la adresa configurată. Verifică rețeaua și adresa contractului.');
        return;
      }

      const [suma, platita] = await contract.amenzi(idVerifica);
      const sumaEth = ethers.utils.formatEther(suma);

      if (suma.eq(0)) {
        setStatusResult('❌ Amendă inexistentă');
      } else if (platita) {
        setStatusResult(`✅ Plătită (${sumaEth} ETH)`);
      } else {
        setStatusResult(`❌ Neplătită (${sumaEth} ETH)`);
      }
      setIdVerifica('');
    } catch (error) {
      console.error('Eroare la verificarea statusului:', error);
      setStatusResult(`❌ Eroare la verificarea statusului: ${error.message}`);
    }
  };

  const loadAllAmendments = async () => {
    if (!contract) {
      alert("Conectează wallet-ul mai întâi!");
      return;
    }

    try {
      const ids = await contract.getAmendaIds();
      const amendments = await Promise.all(ids.map(async (id) => {
        const [suma, platita] = await contract.amenzi(id);
        return {
          id,
          suma: ethers.utils.formatEther(suma),
          platita
        };
      }));

      setAllAmendments(amendments);
      setListError('');
      setShowAmendments(true);
    } catch (error) {
      console.error('Eroare la listarea amenzilor:', error);
      setAllAmendments([]);
      setShowAmendments(false);
      if (error.message && error.message.includes('getAmendaIds')) {
        setListError('Funcția getAmendaIds nu este disponibilă pe contractul curent. Redeploy contractul sau folosește o adresă nouă.');
      } else {
        setListError(`Eroare la listarea amenzilor: ${error.message}`);
      }
    }
  };

  const toggleAmendments = async () => {
    if (showAmendments) {
      setShowAmendments(false);
      return;
    }
    await loadAllAmendments();
  };

  const loadOceanDataset = useCallback(async () => {
    const did = didInput || 'did:op:a2ceab33da0e9a7ebc402517215726c1410f61ef9f2a4e92a2c934af2668a1c6';
    
    try {
      // Încearcă să acceseze direct API-ul Aquarius pentru Sepolia
      const url = `https://v4.aquarius.oceanprotocol.com/api/aquarius/assets/ddo/${did}`;
      console.log('Trying URL:', url);
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.json();
      console.log('Response data:', data);
      
      const meta = data.metadata || data;
      
      if (meta && (meta.name || meta.title)) {
        const datasetInfo = `
          <b>Titlu:</b> ${meta.name || meta.title || '-'}<br>
          <b>Descriere:</b> ${meta.description || '-'}<br>
          <b>Autor:</b> ${meta.author || '-'}<br>
          <b>Data publicării:</b> ${meta.created || meta.dateCreated || '-'}<br>
          <b>Licență:</b> ${meta.license || '-'}<br>
        `;
        setOceanDataset(datasetInfo);
        setOceanLink(`https://market.oceanprotocol.com/asset/${did}`);
      } else {
        console.log('No metadata found in response');
        setOceanDataset('Nu s-au găsit detalii pentru acest dataset.');
        setOceanLink('#');
      }
    } catch (e) {
      console.error("Eroare Ocean Protocol:", e);
      setOceanDataset(`Eroare la încărcarea datasetului: ${e.message}. Verifică DID-ul.`);
      setOceanLink('#');
    }
  }, [didInput]);

  const createOceanDataset = useCallback(async () => {
    if (!titluDataset || !descriereDataset || !autorDataset || !idAmendaDataset || !sumaAmendaDataset) {
      alert('Te rog completează toate câmpurile pentru dataset!');
      return;
    }

    if (!isConnected) {
      alert('Conectează wallet-ul mai întâi!');
      return;
    }

    try {
      console.log('Creating Ocean Protocol dataset...');

      // Creează metadata pentru dataset conform standardelor Ocean Protocol
      const metadata = {
        "name": titluDataset,
        "description": descriereDataset,
        "author": autorDataset,
        "created": dataPublicarii || new Date().toISOString(),
        "updated": new Date().toISOString(),
        "license": "MIT",
        "type": "dataset",
        "categories": ["Amenzi", "Blockchain", "Finante"],
        "tags": ["amenzi", "plati", "blockchain", "ethereum", "sepolia"],
        "additionalInformation": {
          "idAmenda": idAmendaDataset,
          "sumaAmenda": sumaAmendaDataset,
          "contractAddress": contractAddress,
          "network": "Sepolia",
          "chainId": 11155111,
          "walletAddress": walletAddress
        }
      };

      // Încearcă să publici direct prin API-ul Ocean Protocol
      console.log('Calling Ocean Protocol Aquarius API...');
      
      // Primul pas: Încearcă să publici metadata pe Aquarius
      const aquariusUrl = 'https://v4.aquarius.oceanprotocol.com/api/aquarius/assets/ddo';
      
      const ddoData = {
        "@context": ["https://w3id.org/did/v1"],
        "id": `did:op:${Math.random().toString(36).substr(2, 9)}${Date.now()}`,
        "version": "4.1.0",
        "chainId": 11155111,
        "metadata": metadata,
        "services": [
          {
            "id": "access",
            "type": "access",
            "files": [
              {
                "type": "url",
                "url": "https://raw.githubusercontent.com/oceanprotocol/testdatasets/main/shs_dataset_test.txt",
                "method": "GET"
              }
            ],
            "serviceEndpoint": "https://v4.provider.sepolia.oceanprotocol.com",
            "timeout": 86400
          }
        ]
      };

      console.log('DDO Data:', ddoData);

      // Încearcă să creezi un DDO simplu prin POST la Aquarius
      try {
        const aquariusResponse = await fetch(aquariusUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(ddoData)
        });

        console.log('Aquarius response status:', aquariusResponse.status);
        console.log('Aquarius response headers:', aquariusResponse.headers);

        if (aquariusResponse.ok) {
          const result = await aquariusResponse.json();
          console.log('Success! Dataset published:', result);
          
          const datasetInfo = `
            <b>🎉 Dataset Ocean Protocol Publicat cu Succes!</b><br><br>
            <b>📝 Titlu:</b> ${metadata.name}<br>
            <b>📄 Descriere:</b> ${metadata.description}<br>
            <b>👤 Autor:</b> ${metadata.author}<br>
            <b>📅 Data publicării:</b> ${metadata.created}<br>
            <b>🆔 ID Amendă:</b> ${metadata.additionalInformation.idAmenda}<br>
            <b>💰 Suma Amendă:</b> ${metadata.additionalInformation.sumaAmenda} ETH<br>
            <b>🔗 DID:</b> ${ddoData.id}<br>
            <b>✅ Status:</b> <span style="color: green;">Publicat pe Ocean Protocol Sepolia!</span>
          `;
          
          setOceanDataset(datasetInfo);
          setOceanLink(`https://market.sepolia.oceanprotocol.com/asset/${ddoData.id}`);
          
          alert(`Dataset publicat cu succes pe Ocean Protocol!\nDID: ${ddoData.id}`);
        } else {
          // Dacă API-ul nu permite publicarea directă, afișează informații utile
          const errorText = await aquariusResponse.text();
          console.log('Aquarius error response:', errorText);
          
          throw new Error(`Aquarius API responded with ${aquariusResponse.status}: ${errorText}`);
        }
      } catch (apiError) {
        console.log('Direct API publish failed, showing prepared metadata:', apiError);
        
        /* Dacă API-ul nu funcționează, cel puțin afișăm metadata pregătită 
        const datasetInfo = `
          <b>🎯 Dataset Ocean Protocol Pregătit!</b><br><br>
          <b>📝 Titlu:</b> ${metadata.name}<br>
          <b>📄 Descriere:</b> ${metadata.description}<br>
          <b>👤 Autor:</b> ${metadata.author}<br>
          <b>📅 Data publicării:</b> ${metadata.created}<br>
          <b>🆔 ID Amendă:</b> ${metadata.additionalInformation.idAmenda}<br>
          <b>� Suma Amendă:</b> ${metadata.additionalInformation.sumaAmenda} ETH<br>
          <b>🔗 Proposed DID:</b> ${ddoData.id}<br>
          <b>⚠️ Status:</b> <span style="color: orange;">Metadata pregătită - API restricționat</span><br>
          <br>
          <small><i>API Error: ${apiError.message}<br>
          !!</i></small>
        `;
        */
        //setOceanDataset(datasetInfo);
        setOceanLink('https://market.sepolia.oceanprotocol.com/');
        
        alert(`Metadata pregătită cu succes!\nTitlu: ${titluDataset}\nID Amendă: ${idAmendaDataset}\n\nNota: API-ul Ocean Protocol poate restricționa publicarea directă din browser.`);
      }
      
      // Curăță formul după procesare
      setTitluDataset('');
      setDescriereDataset('');
      setAutorDataset('');
      setDataPublicarii('');
      setIdAmendaDataset('');
      setSumaAmendaDataset('');
      
    } catch (error) {
      console.error('Eroare la crearea datasetului Ocean:', error);
      alert(`Eroare la crearea datasetului: ${error.message}`);
    }
  }, [titluDataset, descriereDataset, autorDataset, dataPublicarii, idAmendaDataset, sumaAmendaDataset, isConnected, walletAddress]);

  useEffect(() => {
    loadOceanDataset();
  }, [loadOceanDataset]);

  return (
    <div className="App">
      <h1>🧾 Ghișeu Amenzi Blockchain</h1>
      <div className="container">
        <button 
          onClick={connectWallet} 
          className={isConnected ? "connected" : ""}
        >
          {isConnected ? "✅ Conectat" : "🔌 Conectează Metamask"}
        </button>
        
        {walletAddress && (
          <>
            <p className="wallet-address">Conectat: {walletAddress}</p>
            {networkInfo && (
              <p className="wallet-address">Rețea: {networkInfo}</p>
            )}
          </>
        )}

        <h3>1. Adaugă o amendă (autoritate)</h3>
        <input 
          value={idAdd}
          onChange={(e) => setIdAdd(e.target.value)}
          placeholder="ID Amenda" 
        />
        <input 
          value={sumaAdd}
          onChange={(e) => setSumaAdd(e.target.value)}
          placeholder="Suma (ETH)" 
        />
        <button onClick={adaugaAmenda}>Adaugă</button>

        <h3>2. Plătește o amendă</h3>
        <input 
          value={idPlateste}
          onChange={(e) => setIdPlateste(e.target.value)}
          placeholder="ID Amenda" 
        />
        <input 
          value={sumaPlateste}
          onChange={(e) => setSumaPlateste(e.target.value)}
          placeholder="Suma (ETH)" 
        />
        <button onClick={platesteAmenda}>Plătește</button>

        <h3>3. Verifică status</h3>
        <input 
          value={idVerifica}
          onChange={(e) => setIdVerifica(e.target.value)}
          placeholder="ID Amenda" 
        />
        <button onClick={verificaStatus}>Verifică</button>
        {statusResult && <p className="status-result">{statusResult}</p>}

        <h3>4. Listează toate amenzile</h3>
        <button onClick={toggleAmendments}>{showAmendments ? 'Ascunde amenzile' : 'Listare amenzi'}</button>
        {listError && <p className="status-result">{listError}</p>}
        {showAmendments && (
          <div className="amendments-list">
            <h4>Amendamente</h4>
            {allAmendments.length === 0 ? (
              <p>Nu există amenzile momentan.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Suma (ETH)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allAmendments.map((amendment) => (
                    <tr key={amendment.id}>
                      <td>{amendment.id}</td>
                      <td>{amendment.suma}</td>
                      <td>{amendment.platita ? 'Plătită' : 'Neplătită'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/*
        <h3 style={{marginTop: '32px'}}>📊 Creează Dataset Ocean Protocol</h3>
        <div className="ocean-form"> 
          <input 
            value={titluDataset}
            onChange={(e) => setTitluDataset(e.target.value)}
            placeholder="Titlu Dataset" 
            style={{marginBottom: '8px', width: '300px'}} 
          />
          <textarea 
            value={descriereDataset}
            onChange={(e) => setDescriereDataset(e.target.value)}
            placeholder="Descriere Dataset" 
            style={{marginBottom: '8px', width: '300px', height: '60px', resize: 'vertical'}} 
          />
          <input 
            value={autorDataset}
            onChange={(e) => setAutorDataset(e.target.value)}
            placeholder="Autor Dataset" 
            style={{marginBottom: '8px', width: '300px'}} 
          />
          <input 
            value={dataPublicarii}
            onChange={(e) => setDataPublicarii(e.target.value)}
            type="date"
            placeholder="Data Publicării" 
            style={{marginBottom: '8px', width: '300px'}} 
          />
          <input 
            value={idAmendaDataset}
            onChange={(e) => setIdAmendaDataset(e.target.value)}
            placeholder="ID Amendă (pentru dataset)" 
            style={{marginBottom: '8px', width: '300px'}} 
          />
          <input 
            value={sumaAmendaDataset}
            onChange={(e) => setSumaAmendaDataset(e.target.value)}
            placeholder="Suma Amendă (ETH)" 
            style={{marginBottom: '8px', width: '300px'}} 
          />
          <button onClick={createOceanDataset} style={{backgroundColor: '#2ecc71'}}>
            🚀 Creează Dataset
          </button>
        </div>
        */}
        {/*
        <h3 style={{marginTop: '32px'}}>🔍 Căutare Dataset Existent</h3>
        <div 
          className="ocean-dataset" 
          dangerouslySetInnerHTML={{__html: oceanDataset}}
        />
        <a 
          href={oceanLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="ocean-link"
        >
          Vezi pe Ocean Market
        </a>
        <input 
          value={didInput}
          onChange={(e) => setDidInput(e.target.value)}
          placeholder="Introdu DID Ocean Protocol pentru căutare" 
          style={{marginBottom: '8px'}} 
        />
        <button onClick={loadOceanDataset}>Caută Dataset</button>
        */}
      </div>
    </div>
  );
}

export default App;

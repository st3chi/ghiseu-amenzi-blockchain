# 🧾 Ghișeu Amenzi Blockchain

Aplicație completă pentru gestionarea amenzilor pe blockchain cu integrare **Ocean Protocol**. 
Suportă atât **Hardhat Local Network** cât și **Sepolia Testnet**.

## ⚡ Funcționalități

- 🏛️ **Gestionare Amenzi**: Adaugă, plătește, verifică status amenzi
- 🌊 **Ocean Protocol**: Creează și caută dataset-uri pentru amenzi
- 🔄 **Dual Network**: Funcționează pe Hardhat Local și Sepolia Testnet
- 🔗 **MetaMask Integration**: Conectare automată și detectare rețea
- ⚛️ **React Frontend**: Interfață modernă și responsive

## 📋 Cerințe

- **Node.js** (v16+)
- **npm** sau **yarn**
- **MetaMask** browser extension
- **Git**

## 🚀 Instalare

```bash
# 1. Clonează repository-ul
git clone https://github.com/st3chi/ghiseu-amenzi-blockchain.git
cd ghiseu-amenzi-blockchain

# 2. Instalează dependențele pentru contracte
npm install

# 3. Instalează dependențele pentru React app
cd frontend_new
npm install
cd ..
```

---

## 🏠 Rulare pe Hardhat Local Network

### 1. **Pornește Nodul Hardhat Local**
```bash
npm run node
```
📝 *Aceasta va afișa 20 de conturi cu câte 10,000 ETH fiecare și va rula nodul pe `http://127.0.0.1:8545`*

### 2. **Deploy Contractul Local** (în alt terminal)
```bash
npm run deploy-local
```
📝 *Notează adresa contractului afișată (ex: `0x5FbDB2315678afecb367f032d93F642f64180aa3`)*

### 3. **Actualizează Adresa Contractului** (dacă e necesar)
Dacă adresa contractului deployat diferă de cea din cod, actualizează `localContractAddress` în `frontend_new/src/App.js`:
```javascript
const localContractAddress = "ADRESA_TA_CONTRACT_LOCAL";
```

### 4. **Configurează MetaMask pentru Localhost**
- **Network Name**: `Hardhat Local`
- **RPC URL**: `http://127.0.0.1:8545`
- **Chain ID**: `31337`
- **Currency Symbol**: `ETH`

### 5. **Importă Account de Test în MetaMask**
Din output-ul `npm run node`, copiază o **Private Key** și importă-o în MetaMask.

### 6. **Pornește Frontend-ul**
```bash
cd frontend_new
npm start
```
🌐 **Aplicația va fi disponibilă la: `http://localhost:3000`**

---

## 🌐 Rulare pe Sepolia Testnet

### 1. **Configurează MetaMask pentru Sepolia**
Aplicația va adăuga automat rețeaua când te conectezi, sau o poți adăuga manual:
- **Network Name**: `Sepolia Test Network`
- **RPC URL**: `https://1rpc.io/sepolia`
- **Chain ID**: `11155111`
- **Currency Symbol**: `ETH`
- **Block Explorer**: `https://sepolia.etherscan.io/`

### 2. **Obține ETH de Test**
Folosește Sepolia faucets:
- 🚰 [SepoliaFaucet.com](https://sepoliafaucet.com/)
- 🚰 [Alchemy Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)
- 🚰 [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)

### 3. **Deploy pe Sepolia** (opțional - contractul e deja deployat)
```bash
npm run deploy-sepolia
```
📝 *Contractul actual pe Sepolia: `0x1B46704a7b474b19D03cADb0C255bCB87e5d4C6E`*

### 4. **Pornește Frontend-ul**
```bash
cd frontend_new
npm start
```
🌐 **Aplicația va fi disponibilă la: `http://localhost:3000`**

---

## 🔄 Schimbarea între Rețele

Aplicația **detectează automat** rețeaua și se configurează corespunzător:

| Rețea | Chain ID | Contract Address | Utilizare |
|-------|----------|------------------|-----------|
| **Hardhat Local** | `31337` | Deployat local | Dezvoltare, testare rapidă |
| **Sepolia Testnet** | `11155111` | `0x1B46704a7b474b19D03cADb0C255bCB87e5d4C6E` | Demo, testare publică |

## 🧪 Testare Funcționalități

### ✅ **Gestionare Amenzi**
1. **Conectează MetaMask** - Aplicația detectează rețeaua automat
2. **Adaugă amendă** - Introduce ID și suma (doar admin)
3. **Plătește amendă** - Selectează ID și plătește suma exactă
4. **Verifică status** - Verifică dacă amenda a fost plătită

### ✅ **Ocean Protocol Integration**
1. **Creează Dataset** - Completează formul cu detalii amendă
2. **Upload pe Ocean Protocol** - Metadata se încarcă automat
3. **Căutare Dataset** - Introduce DID pentru a căuta dataset existent

## 🛠️ Comenzi Disponibile

```bash
# Contracte
npm run compile        # Compilează contractele Solidity
npm run node          # Pornește nodul Hardhat local
npm run deploy-local  # Deploy pe localhost
npm run deploy-sepolia # Deploy pe Sepolia

# Frontend
cd frontend_new
npm start            # Pornește React app (development)
npm run build        # Compilează pentru producție
```

## 🆘 Troubleshooting

### ❌ **Nu se poate conecta la wallet**
- ✅ Verifică că MetaMask este instalat și deblocat
- ✅ Schimbă la rețeaua corectă (Sepolia sau Hardhat Local)
- ✅ Refresh pagina după schimbarea rețelei

### ❌ **Tranzacțiile eșuează**
- ✅ Verifică că ai suficient ETH în wallet
- ✅ Pentru localhost: Asigură-te că nodul Hardhat rulează
- ✅ Pentru Sepolia: Verifică că RPC-ul funcționează

### ❌ **Ocean Protocol nu funcționează**
- ✅ Verifică conexiunea la internet
- ✅ Contractul trebuie să fie deployat pe rețeaua activă
- ✅ Wallet-ul trebuie să fie conectat

### ❌ **Erori la compilare**
```bash
# Șterge cache și reinstalează
rm -rf node_modules package-lock.json
npm install

# Pentru React app
cd frontend_new
rm -rf node_modules package-lock.json
npm install
```

## 🌊 Ocean Protocol Integration

Acest proiect folosește Ocean Protocol pentru a publica date publice despre amenzi (anonimizate), transformându-le în bunuri publice digitale (public goods).

🔗 Vizualizează datasetul publicat:  
[https://market.oceanprotocol.com/asset/did:op:a2ceab33da0e9a7ebc402517215726c1410f61ef9f2a4e92a2c934af2668a1c6](https://market.oceanprotocol.com/asset/did:op:a2ceab33da0e9a7ebc402517215726c1410f61ef9f2a4e92a2c934af2668a1c6)

---

## 📁 Structura Proiectului

```
ghiseu-amenzi-blockchain/
├── contracts/           # Contracte Solidity
├── scripts/            # Scripts pentru deploy și testare
├── frontend_new/       # Aplicația React
│   ├── src/
│   │   ├── App.js     # Componenta principală
│   │   └── abi.json   # ABI contractul
│   └── package.json
├── hardhat.config.js   # Configurația Hardhat
├── package.json        # Dependențe și scripturi
└── README.md          # Documentație
```

## 🤝 Contribuție

1. Fork repository-ul
2. Creează o branch nouă (`git checkout -b feature/amazing-feature`)
3. Commit schimbările (`git commit -m 'Add amazing feature'`)
4. Push la branch (`git push origin feature/amazing-feature`)
5. Deschide un Pull Request

## 📄 Licență

Acest proiect este licențiat sub MIT License - vezi fișierul [LICENSE](LICENSE) pentru detalii.

## 📞 Contact

**Autor**: st3chi  
**Repository**: [ghiseu-amenzi-blockchain](https://github.com/st3chi/ghiseu-amenzi-blockchain)

Pentru întrebări sau probleme, deschide un [issue](https://github.com/st3chi/ghiseu-amenzi-blockchain/issues)!

---
**🚀 Happy Coding! 🎉**

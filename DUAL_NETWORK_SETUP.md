# 🚀 Ghișeu Amenzi - Dual Network Setup

Această aplicație poate rula atât pe **Hardhat Local Network** cât și pe **Sepolia Testnet**.

## 📋 Prerequisites

- Node.js și npm instalate
- MetaMask instalat în browser
- ETH de test pentru Sepolia (dacă folosești testnet)

## 🔧 Setup Inițial

```bash
# Instalează dependențele pentru contracte
npm install

# Instalează dependențele pentru React app
cd frontend_new
npm install
cd ..
```

## 🏠 Rețea Locală (Hardhat)

### 1. Pornește nodul Hardhat local
```bash
npm run node
```

Aceasta va afișa adrese de test cu ETH și va rula un nod local pe `http://127.0.0.1:8545`

### 2. Deploy contractul local
```bash
# În alt terminal
npm run deploy-local
```

### 3. Configurează MetaMask pentru localhost
- Network Name: `Hardhat Local`
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `31337`
- Currency Symbol: `ETH`

### 4. Importă un account de test în MetaMask
Copiază una din cheile private afișate de `npm run node` și importă-o în MetaMask.

### 5. Actualizează adresa contractului
După deploy local, copiază adresa contractului și actualizează `contractAddress` în `frontend_new/src/App.js`.

### 6. Pornește aplicația React
```bash
cd frontend_new
npm start
```

## 🌐 Sepolia Testnet

### 1. Deploy pe Sepolia (dacă nu e deja deployat)
```bash
npm run deploy-sepolia
```

### 2. Configurează MetaMask pentru Sepolia
- Network va fi adăugat automat când conectezi wallet-ul
- Sau adaugă manual:
  - Network Name: `Sepolia Test Network`
  - RPC URL: `https://1rpc.io/sepolia`
  - Chain ID: `11155111`
  - Currency Symbol: `ETH`
  - Block Explorer: `https://sepolia.etherscan.io/`

### 3. Obține ETH de test
Folosește Sepolia faucets pentru a obține ETH de test:
- https://sepoliafaucet.com/
- https://www.alchemy.com/faucets/ethereum-sepolia

### 4. Pornește aplicația React
```bash
cd frontend_new
npm start
```

## 🔄 Switch între rețele

Aplicația detectează automat rețeaua și se configurează corespunzător:

- **Sepolia (11155111)**: Folosește contractul deployat pe testnet
- **Hardhat Local (31337)**: Folosește contractul deployat local

## 🧪 Testare

### Funcționalități disponibile pe ambele rețele:
1. ✅ **Conectare MetaMask**: Detectează și schimbă rețeaua automat
2. ✅ **Gestionare Amenzi**: Adaugă, plătește, verifică amenzi
3. ✅ **Ocean Protocol**: Creează și caută dataset-uri

### Funcționalități specifice rețelei:
- **Sepolia**: Ocean Protocol integration completă
- **Local**: Testare rapidă, dezvoltare

## 📝 Notițe

- Pentru dezvoltare, folosește rețeaua locală
- Pentru demonstrații, folosește Sepolia
- Aplicația afișează rețeaua curentă în interfață
- Contractele sunt identice pe ambele rețele

## 🔧 Comenzi utile

```bash
# Compilează contractele
npm run compile

# Pornește nodul local
npm run node

# Deploy local
npm run deploy-local

# Deploy Sepolia
npm run deploy-sepolia

# Pornește React app
cd frontend_new && npm start
```

## 🆘 Troubleshooting

### Dacă aplicația nu se conectează:
1. Verifică că MetaMask este pe rețeaua corectă
2. Verifică că ai ETH în wallet
3. Verifică că adresa contractului este corectă
4. Refreshează pagina

### Pentru rețeaua locală:
1. Asigură-te că nodul Hardhat rulează
2. Verifică că Chain ID este 31337
3. Importă un account de test în MetaMask

### Pentru Sepolia:
1. Asigură-te că ai ETH de test
2. Verifică că RPC-ul funcționează
3. Contractul este la: `0x1B46704a7b474b19D03cADb0C255bCB87e5d4C6E`

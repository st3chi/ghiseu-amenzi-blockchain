# Ghișeu Amenzi Blockchain

Acest proiect este un DApp complet pentru gestionarea amenzilor pe blockchain (Hardhat, Solidity, frontend JS, Ocean Protocol demo).

## Cerințe
- Node.js (v16+)
- npm
- MetaMask (browser extension)

## Instalare
1. Clonează repo-ul:
   ```sh
   git clone https://github.com/st3chi/ghiseu-amenzi-blockchain.git
   cd ghiseu-amenzi-blockchain
   ```
2. Instalează dependențele:
   ```sh
   npm install
   ```

## Pași pentru rulare locală

### 1. Pornește blockchain-ul local Hardhat
```sh
npx hardhat node
```

### 2. Deploiază contractul pe rețeaua locală
```sh
npx hardhat run scripts/deploy.js --network localhost
```

### 3. (Opțional) Adaugă amenzi prestabilite ca admin
```sh
npx hardhat run scripts/adauga_amenzi.js --network localhost
```

### 4. Pornește frontend-ul
```sh
npx http-server frontend -p 8080
```

### 5. Conectează MetaMask
- Importă unul din conturile generate de Hardhat (vezi terminalul la pornirea node-ului, copy-paste private key).
- Selectează rețeaua Localhost 8545 în MetaMask.

### 6. Accesează aplicația
Deschide în browser: [http://localhost:8080](http://localhost:8080)

## Funcționalități principale
- Adaugă amendă (doar admin/owner)
- Plătește amendă (oricine)
- Verifică status amendă
- Integrare demo Ocean Protocol (dataset public)

## Notă
- Pentru testare pe rețea publică (ex: Sepolia), modifică configurația Hardhat și folosește un endpoint Infura/Alchemy + cont cu ETH de test.
- Tranzacțiile locale NU apar pe Etherscan.

---

Dacă ai întrebări sau întâmpini probleme, deschide un issue sau contactează-mă!

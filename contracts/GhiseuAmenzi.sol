// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GhiseuAmenzi {
    struct Amenda {
        uint suma;
        bool platita;
    }

    mapping(string => Amenda) public amenzi;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Nu esti autorizat!");
        _;
    }

    function adaugaAmenda(string memory idAmenda, uint suma) public onlyOwner {
        amenzi[idAmenda] = Amenda(suma, false);
    }

    function platesteAmenda(string memory idAmenda) public payable {
        require(!amenzi[idAmenda].platita, "Amenda deja platita!");
        require(msg.value == amenzi[idAmenda].suma, "Suma incorecta!");
        
        amenzi[idAmenda].platita = true;
    }

    function verificaStatus(string memory idAmenda) public view returns(bool) {
        return amenzi[idAmenda].platita;
    }

    function retrageFonduri() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
} 
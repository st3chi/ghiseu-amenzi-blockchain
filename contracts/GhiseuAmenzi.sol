// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GhiseuAmenzi {
    struct Amenda {
        uint suma;
        bool platita;
    }

    mapping(string => Amenda) public amenzi;
    mapping(string => bool) public amendaExistenta;
    string[] public amendaIds;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Nu esti autorizat!");
        _;
    }

    event AmendaAdaugata(string indexed idAmenda, uint suma);

    function adaugaAmenda(string memory idAmenda, uint suma) public onlyOwner {
        require(!amendaExistenta[idAmenda], "Amenda exista deja!");
        amenzi[idAmenda] = Amenda(suma, false);
        amendaExistenta[idAmenda] = true;
        amendaIds.push(idAmenda);
        emit AmendaAdaugata(idAmenda, suma);
    }

    function platesteAmenda(string memory idAmenda) public payable {
        require(!amenzi[idAmenda].platita, "Amenda deja platita!");
        require(msg.value == amenzi[idAmenda].suma, "Suma incorecta!");
        
        amenzi[idAmenda].platita = true;
    }

    function verificaStatus(string memory idAmenda) public view returns(uint, bool) {
        return (amenzi[idAmenda].suma, amenzi[idAmenda].platita);
    }

    function getAmendaIds() public view returns (string[] memory) {
        return amendaIds;
    }

    function retrageFonduri() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
} 
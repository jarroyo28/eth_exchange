const Marketplace = artifacts.require("Marketplace");

module.exports = function(deployer) {
  deployer.deploy(Marketplace);
};

// This file takes the smart contracts and puts them on the blockchain

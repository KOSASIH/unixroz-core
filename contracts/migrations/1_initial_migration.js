const Migrations = artifacts.require("Migrations");
const Unixroz = artifacts.require("Unixroz");

module.exports = function (deployer) {
  // Deploy the Migrations contract
  deployer.deploy(Migrations)
    .then(() => {
      // Deploy the Unixroz main contract after Migrations
      return deployer.deploy(Unixroz);
    });
};

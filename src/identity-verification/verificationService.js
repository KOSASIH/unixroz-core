const Web3 = require('web3');
const IdentityContractABI = require('./identityContractABI.json'); // ABI of the smart contract
const contractAddress = '0xYourContractAddress'; // Replace with your deployed contract address

class VerificationService {
    constructor() {
        this.web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        this.contract = new this.web3.eth.Contract(IdentityContractABI, contractAddress);
    }

    async registerIdentity(name, email) {
        const accounts = await this.web3.eth.getAccounts();
        const result = await this.contract.methods.registerIdentity(name, email).send({ from: accounts[0] });
        return result;
    }

    async verifyIdentity(userAddress) {
        const accounts = await this.web3.eth.getAccounts();
        const result = await this.contract.methods.verifyIdentity(userAddress).send({ from: accounts[0] });
        return result;
    }

    async revokeIdentity(userAddress) {
        const accounts = await this.web3.eth.getAccounts();
        const result = await this.contract.methods.revokeIdentity(userAddress).send({ from: accounts[0] });
        return result;
    }

    async getIdentity(userAddress) {
        const identity = await this.contract.methods.getIdentity(userAddress).call();
        return {
            name: identity[0],
            email: identity[1],
            isVerified: identity[2]
        };
    }
}

module.exports = new VerificationService();

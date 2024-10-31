// src/services/identityService.js

const { ethers } = require('ethers');
const jwt = require('jsonwebtoken');
const { IdentityContract } = require('../contracts/identityContract'); // Import the smart contract

class IdentityService {
    constructor(providerUrl, contractAddress) {
        this.provider = new ethers.providers.JsonRpcProvider(providerUrl);
        this.contract = new ethers.Contract(contractAddress, IdentityContract.abi, this.provider);
    }

    async verifyIdentity(userId, signature) {
        const isValid = await this.contract.verifySignature(userId, signature);
        return isValid;
    }

    async createIdentity(userId, publicKey) {
        const tx = await this.contract.createIdentity(userId, publicKey);
        await tx.wait();
        return tx.hash;
    }

    generateJWT(userId) {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }

    async getIdentity(userId) {
        const identity = await this.contract.getIdentity(userId);
        return identity;
    }
}

module.exports = new IdentityService(process.env.PROVIDER_URL, process.env.IDENTITY_CONTRACT_ADDRESS);

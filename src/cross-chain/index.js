const Web3 = require('web3');
const express = require('express');
const bodyParser = require('body-parser');
const BridgeContractABI = require('./bridgeContractABI.json'); // ABI of the BridgeContract
const bridgeContractAddress = '0xYourBridgeContractAddress'; // Replace with your deployed contract address

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const bridgeContract = new web3.eth.Contract(BridgeContractABI, bridgeContractAddress);

// Endpoint to lock tokens on the source chain
app.post('/lockTokens', async (req, res) => {
    const { amount, chainId } = req.body;
    const accounts = await web3.eth.getAccounts();
    try {
        const result = await bridgeContract.methods.lockTokens(amount, chainId).send({ from: accounts[0] });
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to mint tokens on the destination chain
app.post('/mintTokens', async (req, res) => {
    const { user, amount, chainId } = req.body;
    const accounts = await web3.eth.getAccounts();
    try {
        const result = await bridgeContract.methods.mintTokens(user, amount, chainId).send({ from: accounts[0] });
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to unlock tokens on the source chain
app.post('/unlockTokens', async (req, res) => {
    const { amount, chainId } = req.body;
    const accounts = await web3.eth.getAccounts();
    try {
        const result = await bridgeContract.methods.unlockTokens(amount, chainId).send({ from: accounts[0] });
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to get user balance
app.get('/balance/:user', async (req, res) => {
    const { user } = req.params;
    try {
        const balance = await bridgeContract.methods.getBalance(user).call();
        res.status(200).json({ success: true, balance: balance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Cross-chain service running on http://localhost:${PORT}`);
});

// index.js
const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const MultiSigWalletABI = require('./multiSigWalletABI.json'); // ABI of the MultiSigWallet contract
const walletAddress = '0xYourMultiSigWalletAddress'; // Replace with your deployed contract address

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const multiSigWalletContract = new web3.eth.Contract(MultiSigWalletABI, walletAddress);

// Endpoint to submit a new transaction
app.post('/submitTransaction', async (req, res) => {
    const { to, value } = req.body;
    const accounts = await web3.eth.getAccounts();
    try {
        const result = await multiSigWalletContract.methods.submitTransaction(to, value).send({ from: accounts[0] });
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to confirm a transaction
app.post('/confirmTransaction', async (req, res) => {
    const { transactionId } = req.body;
    const accounts = await web3.eth.getAccounts();
    try {
        const result = await multiSigWalletContract.methods.confirmTransaction(transactionId).send({ from: accounts[0] });
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to get the list of transactions
app.get('/transactions', async (req, res) => {
    try {
        const transactionCount = await multiSigWalletContract.methods.transactions.length().call();
        const transactions = [];
        for (let i = 0; i < transactionCount; i++) {
            const transaction = await multiSigWalletContract.methods.transactions(i).call();
            transactions.push(transaction);
        }
        res.status(200).json({ success: true, transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to get the list of owners
app.get('/owners', async (req, res) => {
    try {
        const owners = await multiSigWalletContract.methods.owners().call();
        res.status(200).json({ success: true, owners });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Multi-signature wallet service running on http://localhost:${PORT}`);
});

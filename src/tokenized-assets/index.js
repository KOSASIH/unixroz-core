// index.js
const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const AssetTokenABI = require('./assetTokenABI.json'); // ABI of the AssetToken contract
const assetTokenAddress = '0xYourAssetTokenAddress'; // Replace with your deployed contract address

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const assetTokenContract = new web3.eth.Contract(AssetTokenABI, assetTokenAddress);

// Endpoint to mint a new asset token
app.post('/mint', async (req, res) => {
    const { assetURI } = req.body;
    const accounts = await web3.eth.getAccounts();
    try {
        const result = await assetTokenContract.methods.mint(assetURI).send({ from: accounts[0] });
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to transfer an asset token
app.post('/transfer', async (req, res) => {
    const { to, tokenId } = req.body;
    const accounts = await web3.eth.getAccounts();
    try {
        const result = await assetTokenContract.methods.transferAsset(to, tokenId).send({ from: accounts[0] });
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to get the token URI
app.get('/tokenURI/:tokenId', async (req, res) => {
    const { tokenId } = req.params;
    try {
        const uri = await assetTokenContract.methods.tokenURI(tokenId).call();
        res.status(200).json({ success: true, uri });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Asset tokenization service running on http://localhost:${PORT}`);
});

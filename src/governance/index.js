// index.js
const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const GovernanceABI = require('./governanceABI.json'); // ABI of the Governance contract
const governanceAddress = '0xYourGovernanceContractAddress'; // Replace with your deployed contract address

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const governanceContract = new web3.eth.Contract(GovernanceABI, governanceAddress);

// Endpoint to create a new proposal
app.post('/createProposal', async (req, res) => {
    const { description, duration } = req.body;
    const accounts = await web3.eth.getAccounts();
    try {
        const result = await governanceContract.methods.createProposal(description, duration).send({ from: accounts[0] });
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to vote on a proposal
app.post('/vote', async (req, res) => {
    const { proposalId } = req.body;
    const accounts = await web3.eth.getAccounts();
    try {
        const result = await governanceContract.methods.vote(proposalId).send({ from: accounts[0] });
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to execute a proposal
app.post('/executeProposal', async (req, res) => {
    const { proposalId } = req.body;
    const accounts = await web3.eth.getAccounts();
    try {
        const result = await governanceContract.methods.executeProposal(proposalId).send({ from: accounts[0] });
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to get the list of proposals
app.get('/proposals', async (req, res) => {
    try {
        const proposalCount = await governanceContract.methods.proposalCount().call();
        const proposals = [];
        for (let i = 0; i < proposalCount; i++) {
            const proposal = await governanceContract.methods.proposals(i).call();
            proposals.push({
                id: i,
                description: proposal.description,
                voteCount: proposal.voteCount,
                endTime: proposal.endTime,
                executed: proposal.executed
            });
        }
        res.status(200).json({ success: true, proposals });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to get voting power of an address
app.get('/votingPower/:address', async (req, res) => {
    const { address } = req.params;
    try {
        const power = await governanceContract.methods.votingPower(address).call();
        res.status(200).json({ success: true, votingPower: power });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Governance service running on http://localhost:${PORT}`);
});

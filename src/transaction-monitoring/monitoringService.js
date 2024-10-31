// monitoringService.js
const Web3 = require('web3');

class MonitoringService {
    constructor(providerUrl) {
        this.web3 = new Web3(providerUrl);
        this.latestBlock = null;
    }

    async startMonitoring() {
        this.latestBlock = await this.web3.eth.getBlockNumber();
        console.log(`Starting monitoring from block: ${this.latestBlock}`);

        // Start listening for new blocks
        this.web3.eth.subscribe('newBlockHeaders', (error, blockHeader) => {
            if (!error) {
                this.handleNewBlock(blockHeader);
            } else {
                console.error('Error subscribing to new blocks:', error);
            }
        });
    }

    async handleNewBlock(blockHeader) {
        const block = await this.web3.eth.getBlock(blockHeader.number, true);
        console.log(`New block received: ${block.number}`);

        // Process each transaction in the block
        block.transactions.forEach(transaction => {
            this.processTransaction(transaction);
        });
    }

    processTransaction(transaction) {
        console.log(`Transaction Hash: ${transaction.hash}`);
        console.log(`From: ${transaction.from}`);
        console.log(`To: ${transaction.to}`);
        console.log(`Value: ${this.web3.utils.fromWei(transaction.value, 'ether')} ETH`);
        console.log(`Gas Price: ${this.web3.utils.fromWei(transaction.gasPrice, 'gwei')} Gwei`);
        console.log('-----------------------------------');
    }
}

module.exports = MonitoringService;

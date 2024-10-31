const Web3 = require('web3');
const { abi: unixrozAbi, networks } = require('../build/contracts/Unixroz.json');
const config = require('./config');
const { startMonitoring } = require('./utils/monitoring');
const { analyzeData } = require('./utils/analytics');

const web3 = new Web3(new Web3.providers.HttpProvider(config.ethereumNodeUrl));
const unixrozAddress = networks[config.networkId].address;
const unixrozContract = new web3.eth.Contract(unixrozAbi, unixrozAddress);

async function main() {
    console.log("Connecting to Ethereum network...");

    // Example: Fetching the number of escrows
    const escrowCount = await unixrozContract.methods.getEscrowCount().call();
    console.log(`Total Escrows: ${escrowCount}`);

    // Start monitoring transactions
    startMonitoring(unixrozContract);

    // Example: Analyze data (this could be based on user input or other sources)
    const analysisResult = await analyzeData();
    console.log("Analysis Result:", analysisResult);
}

main().catch(console.error);

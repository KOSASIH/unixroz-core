const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const { abi, evm } = require('../contracts/main_contract.json'); // Assuming the contract is compiled and JSON is available

const web3 = new Web3(new Web3.providers.HttpProvider('https://your.ethereum.node:8545'));
const deployerAddress = '0xYourDeployerAddress';
const privateKey = '0xYourPrivateKey';

async function deployContract() {
    const contract = new web3.eth.Contract(abi);
    const deployTx = contract.deploy({
        data: evm.bytecode.object,
        arguments: [] // Add constructor arguments if needed
    });

    const gasEstimate = await deployTx.estimateGas();
    const gasPrice = await web3.eth.getGasPrice();

    const tx = {
        from: deployerAddress,
        data: deployTx.encodeABI(),
        gas: gasEstimate,
        gasPrice: gasPrice,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(`Contract deployed at address: ${receipt.contractAddress}`);
}

deployContract().catch(console.error);

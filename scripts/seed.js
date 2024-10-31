const Web3 = require('web3');
const contractABI = require('../contracts/main_contract.json').abi;
const contractAddress = '0xYourDeployedContractAddress';
const web3 = new Web3(new Web3.providers.HttpProvider('https://your.ethereum.node:8545'));

const seedData = async () => {
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Example of seeding initial data
    const initialData = [
        { id: 1, name: 'Alice', balance: 1000 },
        { id: 2, name: 'Bob', balance: 1500 },
    ];

    for (const user of initialData) {
        await contract.methods.addUser (user.id, user.name, user.balance).send({ from: accounts[0] });
        console.log(`User  ${user.name} seeded with balance ${user.balance}`);
    }
};

seedData().catch(console.error);

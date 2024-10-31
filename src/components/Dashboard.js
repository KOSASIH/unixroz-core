import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { abi as unixrozAbi, networks } from '../build/contracts/Unixroz.json';
import config from '../src/main/config';

const Dashboard = () => {
    const [escrowCount, setEscrowCount] = useState(0);
    const [userCount, setUser Count] = useState(0);
    const [voteCount, setVoteCount] = useState(0);
    const [web3, setWeb3] = useState(null);
    const unixrozAddress = networks[config.networkId].address;

    useEffect(() => {
        const initWeb3 = async () => {
            const web3Instance = new Web3(new Web3.providers.HttpProvider(config.ethereumNodeUrl));
            setWeb3(web3Instance);
            const contract = new web3Instance.eth.Contract(unixrozAbi, unixrozAddress);
            const countEscrows = await contract.methods.getEscrowCount().call();
            const countUsers = await contract.methods.getUser Count().call(); // Assuming you have this method
            const countVotes = await contract.methods.getVoteCount().call(); // Assuming you have this method
            setEscrowCount(countEscrows);
            setUser Count(countUsers);
            setVoteCount(countVotes);
        };
        initWeb3();
    }, []);

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <p><strong>Total Escrows:</strong> {escrowCount}</p>
            <p><strong>Total Users:</strong> {userCount}</p>
            <p><strong>Total Votes Cast:</strong> {voteCount}</p>
        </div>
    );
};

export default Dashboard;

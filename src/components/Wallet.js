import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const Wallet = () => {
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState(0);
    const [web3, setWeb3] = useState(null);

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3Instance.eth.getAccounts();
                setAccount(accounts[0]);
                const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
                setBalance(web3Instance.utils.fromWei(balanceWei, 'ether'));
            } else {
                alert('Please install MetaMask!');
            }
        };
        initWeb3();
    }, []);

    return (
        <div className="wallet">
            <h2>Wallet Interface</h2>
            <p><strong>Account:</strong> {account}</p>
            <p><strong>Balance:</strong> {balance} ETH</p>
        </div>
    );
};

export default Wallet;

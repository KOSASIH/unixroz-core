async function startMonitoring(unixrozContract) {
    // Monitor EscrowCreated event
    unixrozContract.events.EscrowCreated()
        .on('data', (event) => {
            console.log("New Escrow Created:", event.returnValues);
        })
        .on('error', console.error);

    // Monitor UserRegistered event
    unixrozContract.events.UserRegistered()
        .on('data', (event) => {
            console.log("New User Registered:", event.returnValues);
        })
        .on('error', console.error);

    // Monitor VoteCasted event
    unixrozContract.events.VoteCasted()
        .on('data', (event) => {
            console.log("Vote Casted:", event.returnValues);
        })
        .on('error', console.error);
}

module.exports = { startMonitoring };

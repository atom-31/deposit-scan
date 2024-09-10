const { ethers } = require("hardhat"); // Import the ethers object from hardhat

async function main() {
    // Deposit contract address and ABI
    const beaconAddress = '0x00000000219ab540356cBB839Cbe05303d7705Fa';
    const beaconABI = [
        {
            "inputs": [
                { "internalType": "bytes", "name": "pubkey", "type": "bytes" },
                { "internalType": "bytes", "name": "withdrawal_credentials", "type": "bytes" },
                { "internalType": "bytes", "name": "signature", "type": "bytes" },
                { "internalType": "bytes32", "name": "deposit_data_root", "type": "bytes32" }
            ],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }
    ];

    // Get the signer from the ethers object
    const [signer] = await ethers.getSigners();
    // Initialize the deposit contract
    const depositContract = new ethers.Contract(beaconAddress, beaconABI, signer);

    // Example deposit data
    const pubkey = '0x8e41c113987ef20b9f8893b72e65820c8aa17d07509a2419886866e03a13a0a06cc72675ceccf4d709187b86b99fcded';
    const withdrawal_credentials = '0x010000000000000000000000afedf06777839d59eed3163cc3e0a5057b514399';
    const signature = '0xb5ef04223885828c77a842a2f25ad7a5bd1bdbac49f0ee7e3b1831e318b44b77a4bdba72aba7655bfdf28e68967123d319404821783ebf7b7d93715bb695f46947eba8196b11205587128e20b0cebaf2fa956155ca341276ee0b7f9f310a49e0';
    const deposit_data_root = '0x93149a4330f5796d23c21e6a23282cba6a638a8b90496c8b54e77f2344456b5c';

    // Get the current gas price and increase it by 20%
    const gasPrice = await ethers.provider.getGasPrice();
    const adjustedGasPrice = gasPrice.mul(120).div(100);

    // Send a deposit transaction with adjusted gas settings
    const tx = await depositContract.deposit(
        pubkey,
        withdrawal_credentials,
        signature,
        deposit_data_root,
        {
            value: ethers.utils.parseEther("32"),
            gasLimit: 500000, // Set an appropriate gas limit
            maxFeePerGas: adjustedGasPrice,
            maxPriorityFeePerGas: adjustedGasPrice.div(2)
        }
    );

    // Wait for the transaction to be mined and get the receipt
    const receipt = await tx.wait();
    console.log(`Deposit transaction receipt:`, receipt); // Log the transaction receipt
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

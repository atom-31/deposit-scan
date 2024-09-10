const { Web3 } = require('web3'); // Import Web3 from web3
require('dotenv').config(); // Load environment variables from a .env file
const fs = require('fs'); // Import the fs module
const path = require('path'); // Import the path module
const logger = require('../utils/logger'); // Import the logger object from logger.js

// Initialize Web3 with an Ethereum RPC provider
const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.RPC_URL));
logger.info(`Web3 provider initialized using ${process.env.RPC_URL}`);

// Load contract configuration from JSON file
let contractConfig;
try {
    const contractPath = path.join(__dirname, '..', 'contract.json');
    contractConfig = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
    logger.info('Contract configuration loaded successfully');
} catch (error) {
    logger.error(`Failed to load contract configuration: ${error.message}`);
    process.exit(1);
}

// Beacon Deposit Contract Address and ABI
const DEPOSIT_CONTRACT_ADDRESS = contractConfig.depositContract.address;
const DEPOSIT_CONTRACT_ABI = contractConfig.depositContract.abi;

// Initialize Contract
const depositContract = new web3.eth.Contract(DEPOSIT_CONTRACT_ABI, DEPOSIT_CONTRACT_ADDRESS);
logger.info('Deposit contract initialized');

module.exports = { web3, depositContract };

const axios = require('axios'); // Import the axios library
const logger = require('../utils/logger'); // Import the logger object from logger.js
require('dotenv').config(); // Load environment variables from a .env file

// Fetch internal transactions for a given transaction hash
const fetchInternalTransactions = async (transactionHash) => {
  try {
    const apiKey = process.env.ETHERSCAN_API_KEY; // Your Etherscan API key
    const url = `https://api.etherscan.io/api?module=account&action=txlistinternal&txhash=${transactionHash}&apikey=${apiKey}`;

    // Fetch internal transactions from Etherscan API
    const response = await axios.get(url);
    if (response.data.status === "1") {
      logger.info(`Internal Transactions for ${transactionHash}: ${JSON.stringify(response.data.result, null, 2)}`);
      return response.data.result;
    } else if (response.data.status === "0" && response.data.message === "No transactions found") {
      logger.info(`No internal transactions found for ${transactionHash}.`);
      return [];
    } else {
      logger.warn(`Unexpected response fetching internal transactions: ${response.data.message}`);
      return [];
    }
  } catch (error) {
    logger.error(`Error fetching internal transactions for ${transactionHash}: ${error.message}`);
    return [];
  }
};

module.exports =  fetchInternalTransactions ;

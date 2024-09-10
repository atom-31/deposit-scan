const { web3 } = require('./web3provider'); // Import the web3 object from web3provider.js
const logger = require('../utils/logger'); // Import the logger object from logger.js
const fetchInternalTransactions = require('./fetchInternalTransactions'); // Import the fetchInternalTransactions function from fetchInternalTransactions.js

const saveDepositsToDatabase = require('../database/dbOperations.js'); // Import the saveDepositsToDatabase function from dbOperations.js
const { sendTelegramNotification } = require('./telegramNotifier'); // Import the notification function from telegramNotifier.js


// Process and log a single deposit event, including internal transactions
const processSingleEvent = async (event, isRealTime = false) => {
  try {
    logger.info(`Processing event for transaction: ${event.transactionHash}`);

    // Fetch block details
    const block = await web3.eth.getBlock(event.blockNumber);
    logger.info(`Fetched block ${event.blockNumber}`);
    // Fetch transaction details
    const transaction = await web3.eth.getTransaction(event.transactionHash);
    logger.info(`Fetched transaction details`);

    // Extract deposit details
    const depositDetails = {
      blockNumber: event.blockNumber.toString(),
      blockTimestamp: block.timestamp.toString(),
      fee: web3.utils.fromWei(BigInt(transaction.gasPrice) * BigInt(transaction.gas), 'ether'),
      hash: event.transactionHash,
      pubkey: event.returnValues.pubkey,
      sender: transaction.from, 
      amount: web3.utils.fromWei(event.returnValues.amount, 'ether'), 
      index: event.returnValues.index,
      internalTransactions: [] 
    };

    logger.info(`Deposit Details: ${JSON.stringify(depositDetails, null, 2)}`);

    // Fetch internal transactions if the transaction is not a contract creation
    if (transaction.to) {
      logger.info(`Fetching internal transactions for ${event.transactionHash}`);
      try {
        const internalTransactions = await fetchInternalTransactions(event.transactionHash);
        depositDetails.internalTransactions = internalTransactions;
        logger.info(`Fetched internal transactions`);
      } catch (internalError) {
        logger.error(`Error fetching internal transactions: ${internalError.message}`);
      }
    } else {
      logger.info(`Transaction ${event.transactionHash} is a contract creation, skipping internal transactions.`);
    }

    logger.info(`Saving deposit to database`);
    // Save deposit details to the database
    await saveDepositsToDatabase(depositDetails);
    logger.info(`Deposit saved successfully`);


    if (isRealTime) {
      const message = `New deposit detected!
      - Block Number: ${depositDetails.blockNumber}
      - Timestamp: ${depositDetails.blockTimestamp}
      - Amount: ${depositDetails.amount} ETH
      - Sender: ${depositDetails.sender}
      - Transaction Hash: ${depositDetails.hash}`;
      await sendTelegramNotification(message);
      logger.info(`Telegram notification sent for transaction: ${event.transactionHash}`);
    }
  } catch (error) {
    logger.error(`Error processing event: ${error.message}`);
  }
  logger.info(`Finished processing event for transaction: ${event.transactionHash}`);
};


module.exports = { processSingleEvent };

const Transaction = require('../models/Transaction'); // Import the Transaction model
const InternalTransaction = require('../models/InternalTransaction'); // Import the InternalTransaction model
const logger = require('../utils/logger');// Import the logger object from logger.js

// Helper function to convert timestamp to valid Date object
const parseTimestamp = (timestamp) => {
  // Convert Unix timestamp to milliseconds and create a Date object
  const date = new Date(parseInt(timestamp) * 1000);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }
  return date;
};

// Save deposit details to the database
const saveDepositsToDatabase = async (depositDetails) => {
  try {
    const { blockNumber, blockTimestamp, fee, hash, pubkey, index, sender, amount, internalTransactions } = depositDetails;

    if (!sender || !amount) {
      throw new Error('Missing required fields: sender or amount.');
    }

    // Convert blockTimestamp to a valid Date object
    const parsedTimestamp = parseTimestamp(blockTimestamp);

    // Delete the old transaction if a new one with the same hash comes in
    await Transaction.destroy({ where: { hash } });

    // Save the new transaction
    const transaction = await Transaction.create({ blockNumber, blockTimestamp: parsedTimestamp, fee, hash, pubkey, index, sender, amount });
    logger.info(`Transaction saved with hash: ${hash}`);

    // Delete old internal transactions if new ones are coming in
    await InternalTransaction.destroy({ where: { transactionHash: hash } });

    // Save internal transactions
    if (internalTransactions && internalTransactions.length > 0) {
      const internalTxDocs = internalTransactions.map((tx) => ({
        transactionHash: hash,
        blockNumber: tx.blockNumber,
        timeStamp: parseTimestamp(tx.timeStamp), 
        from: tx.from,
        to: tx.to,
        value: tx.value,
        gas: tx.gas,
        gasUsed: tx.gasUsed,
        isError: tx.isError,
        errCode: tx.errCode
      }));
      // Save internal transactions to the database
      await InternalTransaction.bulkCreate(internalTxDocs);
      logger.info(`Internal transactions saved for transaction hash: ${hash}`);
    } else {
      logger.info(`No internal transactions found for transaction hash: ${hash}`);
    }
  } catch (error) {
    logger.error(`Error saving to database: ${error.message}`);
  }
};

module.exports = saveDepositsToDatabase;

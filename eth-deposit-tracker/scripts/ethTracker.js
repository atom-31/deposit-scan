const logger = require('../utils/logger'); // Import logger from logger.js
const { web3, depositContract } = require('../services/web3provider'); // Import web3 and depositContract from web3provider.js
const { realTimeListener } = require('../services/realTimeListener'); // Import realTimeListener from realTimeListener.js
const { processSingleEvent } = require('../services/processSingleEvent'); // Import processSingleEvent from processSingleEvent.js


// Main function to track deposits
const trackDeposits = async () => {
  try {
    // Validate Web3 and provider
    validateWeb3Connection();

    logger.info('Fetching past DepositEvent logs...');
    // Fetch past events and process them
    await fetchPastEvents();

    logger.info('Setting up real-time event listener for DepositEvent...');
    // Set up real-time event listener
    realTimeListener();
  } catch (error) {
    logger.error(`Error tracking deposits: ${error.message}`);
  }
};

// Validate Web3 and provider
const validateWeb3Connection = () => {
  if (!web3 || !web3.currentProvider) {
    throw new Error('Web3 or its provider is not properly initialized');
  }
  logger.info(`Web3 provider: ${web3.currentProvider.constructor.name}`);
};

// Fetch past events within a block range
const fetchPastEvents = async () => {
  try {
    const latestBlock = BigInt(await web3.eth.getBlockNumber());
    const fromBlock = latestBlock - 1000n > 0n ? latestBlock - 1000n : 0n;

    const recentEvents = await depositContract.getPastEvents('DepositEvent', { 
      fromBlock: fromBlock.toString(),
      toBlock: 'latest'
    });

    if (recentEvents.length > 0) {
      logger.info(`Fetched ${recentEvents.length} recent DepositEvents`);
      // Process Past events
      await processMultipleEvents(recentEvents);
    } else {
      logger.info('No recent DepositEvents found.');
    }
  } catch (error) {
    logger.error(`Error fetching recent DepositEvents: ${error.message}`);
  }
};

// Process multiple deposit events
const processMultipleEvents = async (events) => {
  logger.info(`Starting to process ${events.length} events`);
  for (let i = 0; i < events.length; i++) {
    logger.info(`Processing event ${i + 1} of ${events.length}`);
    // Process each event separately
    await processSingleEvent(events[i]);
  }
  logger.info(`Finished processing all events`);
};

module.exports = { trackDeposits };

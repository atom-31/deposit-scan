const logger = require('../utils/logger.js'); // Import the logger object from logger.js
const  { depositContract }  = require('./web3provider.js'); // Import the depositContract object from web3provider.js
const { processSingleEvent } = require('./processSingleEvent.js'); // Import the processSingleEvent function from processSingleEvent.js

// Set up real-time event listener
const realTimeListener = () => {
  try {
    // Set up real-time listener for DepositEvent
    const eventEmitter = depositContract.events.DepositEvent({});
    // Check if the event emitter supports .on()
    if (eventEmitter && typeof eventEmitter.on === 'function') {
      eventEmitter
        .on('data', async (event) => {
          logger.info('Real-time DepositEvent detected');
          // Process the event
          await processSingleEvent(event,true);
        })
        .on('error', (error) => {
          logger.error(`Error in real-time event listener: ${error.message}`);
        });

      logger.info('Real-time event listener set up successfully');
    } else {
      logger.error('Event emitter is undefined or does not support .on()');
    }
  } catch (error) {
    logger.error(`Failed to set up real-time listener: ${error.message}`);
  }
};

module.exports = { realTimeListener };

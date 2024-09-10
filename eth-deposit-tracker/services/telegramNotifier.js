const axios = require('axios');
require('dotenv').config();
const logger = require('../utils/logger');

// Function to send Telegram notification
const sendTelegramNotification = async (message) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN; // Your bot token
  const chatId = process.env.TELEGRAM_CHAT_ID; // The chat ID of the group/channel

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await axios.post(url, {
      chat_id: chatId,
      text: message,
    });

    if (response.data.ok) {
      logger.info('Telegram notification sent successfully');
    } else {
      logger.error(`Error sending Telegram notification: ${response.data.description}`);
    }
  } catch (error) {
    logger.error(`Failed to send Telegram notification: ${error.message}`);
  }
};

module.exports = { sendTelegramNotification };

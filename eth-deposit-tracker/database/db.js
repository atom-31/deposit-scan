const { Sequelize } = require('sequelize'); // Import the Sequelize class
require('dotenv').config(); // Load environment variables from a .env file

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Disable logging (optional)
});

// Test the connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully.');

    // Synchronize all models
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };

const { DataTypes } = require('sequelize'); // Import the built-in data types
const { sequelize } = require('../database/db'); // Import the connection instance

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  blockNumber: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  blockTimestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fee: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  hash: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  pubkey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  index: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Transactions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = Transaction;

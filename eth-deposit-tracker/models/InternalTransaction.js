const { DataTypes } = require('sequelize'); // Import the built-in data types
const { sequelize } = require('../database/db'); // Import the connection instance
const Transaction = require('./Transaction'); // Import the Transaction model 

const InternalTransaction = sequelize.define('InternalTransaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  transactionHash: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Transaction,
      key: 'hash',
    },
    onDelete: 'CASCADE',
  },
  blockNumber: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  timeStamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  gas: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  gasUsed: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  isError: {
    type: DataTypes.BOOLEAN,
  },
  errCode: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'InternalTransactions', 
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = InternalTransaction;

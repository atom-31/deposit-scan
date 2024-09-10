// require("@nomicfoundation/hardhat-toolbox");

require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      forking: {
        url: process.env.ALCHEMY_API, // Replace with your Alchemy API Key
      },
    },
  },
};



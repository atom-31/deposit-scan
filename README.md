# DepositScan - Ethereum Deposit Tracker

Ethereum Deposit Tracker is an internal tool designed to monitor and record ETH deposits on the Beacon Deposit Contract. It fetches real-time deposit data from the Ethereum blockchain, processes the information, stores it in a PostgreSQL database, and visualizes it using Grafana. The tool also provides Telegram notifications for newly detected deposits.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation Steps](#installation-steps)
- [Running the Project](#running-the-project)
- [Usage](#usage)
  - [Grafana Dashboard](#grafana-dashboard)
  - [Telegram Notifications](#telegram-notifications)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

The Ethereum Deposit Tracker is built to monitor the Beacon Deposit Contract for ETH deposits, including those made through internal transactions. It uses an Ethereum RPC provider for fetching data, PostgreSQL for storing data, and Grafana for visualizing the metrics. It also sends real-time alerts for new deposits via Telegram.

## Features

- **Real-time Monitoring:** Tracks ETH deposits to the Beacon Deposit Contract in real-time.
- **Internal Transactions Tracking:** Handles internal transactions that may occur within a single deposit.
- **Error Handling and Logging:** Comprehensive error handling and logging mechanisms.
- **Visualization:** Grafana dashboard for monitoring deposit data and system metrics.
- **Alerts:** Telegram notifications for new deposits.
- **Containerized:** Dockerized application for easy setup and deployment.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side scripting.
- **Web3.js**: Ethereum JavaScript API for blockchain interaction.
- **Sequelize**: ORM for PostgreSQL database management.
- **PostgreSQL**: Relational database for storing deposit data.
- **Grafana**: Monitoring and analytics dashboard for visualizing data.
- **Docker**: Containerization platform for consistent deployment.
- **Telegram Bot API**: For sending notifications.

## Architecture

The application is divided into the following modules:

1. **Ethereum Tracker**: Uses Web3.js to connect to an Ethereum node (via Alchemy) and monitor the Beacon Deposit Contract.
2. **Database Module**: Manages PostgreSQL for storing transaction and internal transaction data using Sequelize ORM.
3. **Grafana Dashboard**: Provides a visualization layer for deposit data and internal transactions.
4. **Notification System**: Sends Telegram alerts for newly detected deposits.

## Setup and Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js (v18+)](https://nodejs.org/en/)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

### Environment Variables

Create a `.env` file in the /eth-deposit-tracker directory and provide the following environment variables:

```env
RPC_URL=<your_ethereum_rpc_url>
ETHERSCAN_API_KEY=<your_etherscan_api_key>
POSTGRESQL_PASSWORD=<your_postgresql_password>
TELEGRAM_BOT_TOKEN=<your_telegram_bot_token>
TELEGRAM_CHAT_ID=<your_telegram_chat_id>
```

Create a `.env` file in the /hardhat directory and provide the following environment variables:
```env
ALCHEMY_API=<your_alchemy_api>
```

### Get `.env`

## Installation Steps

### Clone the Repository:

```bash
git clone https://github.com/your-username/eth-deposit-tracker.git
cd eth-deposit-tracker
```
### Add the .env configs

### Set Up Docker:
Ensure Docker and Docker Compose are installed on your system. Use the provided docker-compose.yml file to set up the application. Navigate to the eth-deposit-tracker directory and run:
```bash
docker-compose up --build
```

### Start the Ethereum Node (Hardhat):
Navigate to the hardhat directory and run:
```bash
npx hardhat node
```

###C heck Grafana Setup: 
Access Grafana at http://localhost:3000 and import the JSON file provided in the grafana folder to set up the dashboard.

## Usage
### Grafana Dashboard
- Access Grafana at http://localhost:3000.
- Use the default credentials (admin/admin) to log in.
- Import the provided Grafana dashboard JSON file to visualize deposit data.

### Telegram Notifications
- Ensure the Telegram bot is set up correctly with the TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.
- The bot will send real-time notifications for newly detected deposits.

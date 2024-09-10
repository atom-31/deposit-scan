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
  - [Setup .env Variable](#setup-the-environment-variables)
  - [Installation Steps](#installation-steps)
- [Usage](#usage)
  - [Grafana Dashboard](#grafana-dashboard)
  - [Telegram Notifications](#telegram-notifications)

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
DATABASE_URL= 'postgresql://postgres:<POSTGRESQL_PASSWORD>@db:5432/eth_transactions'
GRAFANA_ADMIN_PASSWORD=<your_grafana_admin_password>
```

Create a `.env` file in the /hardhat directory and provide the following environment variables:
```env
ALCHEMY_API=<your_alchemy_api>
```

### Setup The Environment Variables

#### RPC_URL
- If you are testing directly on the mainnet then you can get the websocket url from alchemy: `https://dashboard.alchemy.com/products/smart-websockets` or
- You can replace it with `ws://localhost:8545` for testing with hardhat

#### ETHERSCAN_API_KEY
- You can create an API key in `https://etherscan.io/myapikey`

#### POSTGRESQL_PASSWORD
- This is the Database password set by you
  
#### GRAFANA_ADMIN_PASSWORD
- This is the Grafana Admin password set by you
  
#### ALCHEMY_API
- Create an app project in [Alchemy](https://dashboard.alchemy.com)
- Navigate to the App folder and you will find the API key on the top right corner

#### TELEGRAM_BOT_TOKEN & TELEGRAM_CHAT_ID
To enable Telegram notifications for the Ethereum Deposit Tracker, you need to create a Telegram bot and obtain its Bot Token and Chat ID. Follow these steps:

##### 1. Create a Telegram Bot

1. Open the Telegram app and search for the **BotFather**.
2. Start a chat with the **BotFather** by clicking on the **Start** button.
3. To create a new bot, type the command `/newbot` and follow the instructions provided by the **BotFather**:
   - Provide a name for your bot (e.g., `DepositTrackerBot`).
   - Choose a unique username for your bot that must end in `bot` (e.g., `DepositTracker_Bot`).
4. Once the bot is created, **BotFather** will send you a message containing the **Telegram Bot Token**. This token is required for configuring the environment variables.

##### 2. Obtain Your Telegram Chat ID

1. Start a chat with your newly created bot by searching for its username (e.g., `@DepositTracker_Bot`) and clicking **Start**.
2. Send a simple message like "Hello" to the bot.
3. To get the **Chat ID**, you can use the following URL in your browser, replacing `<YOUR_BOT_TOKEN>` with the token obtained from **BotFather**:

```bash
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
```

4. The output will be a JSON object. Look for the `"chat"` object, which will contain the `"id"` field — this is your **Chat ID**.

##### 3. Configure Environment Variables

Add the **Telegram Bot Token** and **Chat ID** to your `.env` file in the root directory:


## Installation Steps

### 1. Clone the Repository:

```bash
git clone https://github.com/your-username/eth-deposit-tracker.git
cd eth-deposit-tracker
```
### 2. Add the .env configs

### 3. Set Up Docker:
Ensure Docker and Docker Compose are installed on your system. Use the provided docker-compose.yml file to set up the application. Navigate to the eth-deposit-tracker directory and run:
```bash
docker-compose up --build
```

### 4. Start the Ethereum Node (Hardhat):
Navigate to the hardhat directory and run:
```bash
npx hardhat node
```

### 5. Check Grafana Setup: 
Access Grafana at http://localhost:3000 and import the JSON file provided in the grafana folder to set up the dashboard.

## Usage
### Grafana Dashboard
- Access Grafana at http://localhost:3000.
- Use the default credentials (admin/admin) to log in.
- Import the provided Grafana dashboard JSON file to visualize deposit data.

### Telegram Notifications
- Ensure the Telegram bot is set up correctly with the TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.
- The bot will send real-time notifications for newly detected deposits.

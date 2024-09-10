const { trackDeposits } = require('./scripts/ethTracker');
const { connectDB }  = require('./database/db');

async function main() {
    // Connect to the database
    await connectDB();
    // Start tracking deposits
    await trackDeposits();
}

main().catch(console.error);



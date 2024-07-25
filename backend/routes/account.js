// This file contains the routes for handling account related operations.
// It exports a router that defines the routes for the account API.
// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

// Import the required modules
const express = require('express'); // Express is a minimal and flexible Node.js web application framework
const { authMiddleware } = require('../middleware'); // Middleware function to authenticate the user
const { Account } = require('../db'); // Account model for interacting with the database
const { default: mongoose } = require('mongoose'); // Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js

// Create a new router instance
const router = express.Router();

// Define a route for getting the balance of an account.
// This route is protected and requires authentication.
router.get("/balance", authMiddleware, async (req, res) => {
    // Find the account for the authenticated user
    const account = await Account.findOne({
        userId: req.userId // userId is a custom field in the Account model
    });

    // Return the balance of the account as a JSON response
    res.json({
        balance: account.balance
    })
});

// Define a route for transferring funds from one account to another.
// This route is protected and requires authentication.
router.post("/transfer", authMiddleware, async (req, res) => {
    // Start a new transaction session with MongoDB
    const session = await mongoose.startSession();

    // Start the transaction
    session.startTransaction();

    // Destructure the amount and to fields from the request body
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction using the session
    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    // Check if the account exists and if it has sufficient balance
    if (!account || account.balance < amount) {
        // Abort the transaction if the account does not exist or if it has insufficient balance
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    // Fetch the destination account within the transaction using the session
    const toAccount = await Account.findOne({ userId: to }).session(session);

    // Check if the destination account exists
    if (!toAccount) {
        // Abort the transaction if the destination account does not exist
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer by updating the balances of the accounts within the transaction
    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();

    // Return a success message as a JSON response
    res.json({
        message: "Transfer successful"
    });
});

// Export the router so that it can be used in the main application
module.exports = router;

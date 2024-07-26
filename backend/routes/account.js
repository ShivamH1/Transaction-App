// This file contains the routes for interacting with the account resource.
// It handles the HTTP requests for retrieving the balance of an account
// and transferring money between accounts.

const express = require('express');
// Express is a popular web framework for Node.js that provides middleware 
// and routing functionality.

const { authMiddleware } = require('../middleware');
// authMiddleware is a middleware function that checks if the user is authenticated.

const { Account } = require('../db');
// Account is a model defined in the db.js file that represents an account in the database.

const { default: mongoose } = require('mongoose');
// mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

const router = express.Router();
// Create a new instance of the Express router.

// Handle GET request to retrieve the balance of an account.
router.get("/balance", authMiddleware, async (req, res) => {
    // Fetch the account associated with the authenticated user.
    const account = await Account.findOne({
        userId: req.userId
    });

    // Return the balance of the account as a JSON response.
    res.json({
        balance: account.balance
    })
});

// Handle POST request to transfer money between accounts.
router.post("/transfer", authMiddleware, async (req, res) => {
    // Start a new transaction.
    const session = await mongoose.startSession();
    session.startTransaction();

    // Extract the amount and recipient account ID from the request body.
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction.
    const account = await Account.findOne({ userId: req.userId }).session(session);

    // Check if the account exists and has sufficient balance.
    if (!account || account.balance < amount) {
        // If the account doesn't exist or doesn't have enough balance, abort the transaction.
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    // Fetch the recipient account within the transaction.
    const toAccount = await Account.findOne({ userId: to }).session(session);

    // Check if the recipient account exists.
    if (!toAccount) {
        // If the recipient account doesn't exist, abort the transaction.
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer by updating the balances of the accounts.
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction.
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

// Export the router instance so that it can be used in the main application.


module.exports = router;

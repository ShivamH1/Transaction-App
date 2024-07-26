// This file exports a single router instance that will be used by the
// main application to handle incoming requests.

// Import the express module, which provides the functionality for
// creating web servers and handling HTTP requests.
const express = require('express');

// Import the userRouter, which is a router instance that handles
// requests related to users.
const userRouter = require("./user");

// Import the accountRouter, which is a router instance that handles
// requests related to accounts.
const accountRouter = require("./account");

// Create a new router instance that will be used to handle
// incoming requests.
const router = express.Router();

// Mount the userRouter at the "/user" path. This means that any
// requests that arrive at the "/user" path will be handled by
// the userRouter.
router.use("/user", userRouter);

// Mount the accountRouter at the "/account" path. This means that
// any requests that arrive at the "/account" path will be handled
// by the accountRouter.
router.use("/account", accountRouter);

// Export the router instance so that it can be used in the
// main application.
module.exports = router;

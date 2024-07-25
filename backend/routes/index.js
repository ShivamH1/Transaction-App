// This file sets up the routes for the user and account endpoints.

// First, we import the necessary modules:
// - express: the web framework we're using
// - user: the file that contains the routes for the user endpoints
// - account: the file that contains the routes for the account endpoints
const express = require('express');
const userRouter = require("./user");
const accountRouter = require("./account");

// We create a new router instance using express.Router()
const router = express.Router();

// We use the router.use() method to specify that any requests to the /user
// endpoint should be handled by the userRouter module.
// This is done by passing the "/user" string as the first argument to router.use()
// and the userRouter module as the second argument.
router.use("/user", userRouter);

// We use the router.use() method again to specify that any requests to the /account
// endpoint should be handled by the accountRouter module.
// This is done by passing the "/account" string as the first argument to router.use()
// and the accountRouter module as the second argument.
router.use("/account", accountRouter);

// Finally, we export the router module so that it can be used in other parts of the app.
// This is done by assigning the router module to the module.exports object.

module.exports = router;

// This file contains the routes for user-related operations such as signup, signin, 
// updating user information, and fetching user data in bulk.

// Import the required modules and dependencies
const express = require('express');
// Express is a popular web framework for Node.js that provides middleware and routing functionality.

const router = express.Router();
// Create a new instance of the Express router.

const zod = require("zod");
// Zod is a TypeScript-first schema declaration and validation library.

const { User, Account } = require("../db");
// Import the User and Account models from the db.js file.

const jwt = require("jsonwebtoken");
// Import the JSON Web Token (JWT) library for generating and verifying tokens.

const { JWT_SECRET } = require("../config");
// Import the JWT_SECRET from the config.js file.

const  { authMiddleware } = require("../middleware");
// Import the authentication middleware from the middleware.js file.

// Define the schema for the signup request body
const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

// Route for user signup
router.post("/signup", async (req, res) => {
    // Parse the request body using the signupBody schema
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        // If the request body doesn't match the schema, return a 411 status code with an error message
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    // Check if a user with the same username already exists
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        // If a user with the same username exists, return a 411 status code with an error message
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    // Create a new user with the provided information
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    // Generate a unique user ID
    const userId = user._id;

    // Create a new account with the generated user ID and an initial balance
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    // Generate a JWT token with the user ID as payload
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    // Return a JSON response with a success message and the generated token
    res.json({
        message: "User created successfully",
        token: token
    })
})

// Define the schema for the signin request body
const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

// Route for user signin
router.post("/signin", async (req, res) => {
    // Parse the request body using the signinBody schema
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        // If the request body doesn't match the schema, return a 411 status code with an error message
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    // Find a user with the provided username and password
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        // If a user with the provided credentials is found, generate a JWT token with the user ID as payload
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        // Return a JSON response with the generated token
        res.json({
            token: token
        })
        return;
    }

    
    // If a user with the provided credentials is not found, return a 411 status code with an error message
    res.status(411).json({
        message: "Error while logging in"
    })
})

// Define the schema for the update request body
const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

// Route for updating user information
router.put("/", authMiddleware, async (req, res) => {
    // Parse the request body using the updateBody schema
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        // If the request body doesn't match the schema, return a 411 status code with an error message
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    // Update the user with the provided ID with the provided information
    await User.updateOne(req.body, {
        id: req.userId
    })

    // Return a JSON response with a success message
    res.json({
        message: "Updated successfully"
    })
})

// Route for fetching user data in bulk
router.get("/bulk", async (req, res) => {
    // Extract the filter from the query parameters
    const filter = req.query.filter || "";

    // Find all users whose first name or last name matches the filter
    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter } },
            { lastName: { "$regex": filter } }
        ]
    })

    // Return a JSON response with the user data filtered by the provided filter
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

// Export the router for use in the main application

module.exports = router;

// This file contains the routes for user related operations.
// It handles the signup, signin, update and bulk operations for the users.

// Importing necessary modules
const express = require('express');

// Create an instance of express router
const router = express.Router();

// Importing modules for validation and authentication
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");

// Define the schema for user signup
const signupBody = zod.object({
    username: zod.string().email(), // Email should be unique
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

// Route for user signup
router.post("/signup", async (req, res) => {
    // Validate the request body against the signupBody schema
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    // Create a new user with the provided details
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    // Generate a unique id for the user
    const userId = user._id;

    // Create a new account for the user with a random balance
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    // Generate a JSON Web Token (JWT) for the user
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    // Send a JSON response with the success message and the token
    res.json({
        message: "User created successfully",
        token: token
    })
})


// Define the schema for user signin
const signinBody = zod.object({
    username: zod.string().email(), // Email should be unique
	password: zod.string()
})

// Route for user signin
router.post("/signin", async (req, res) => {
    // Validate the request body against the signinBody schema
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    // Find a user with the provided email and password
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        // Generate a JSON Web Token (JWT) for the user
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        // Send a JSON response with the success message and the token
        res.json({
            token: token
        })
        return;
    }

    // Send an error response if the user is not found
    res.status(411).json({
        message: "Error while logging in"
    })
})

// Define the schema for user update
const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

// Route for user update
router.put("/", authMiddleware, async (req, res) => {
    // Validate the request body against the updateBody schema
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    // Update the user with the provided details
    await User.updateOne(req.body, {
        id: req.userId
    })

    // Send a success response
    res.json({
        message: "Updated successfully"
    })
})

// Route for bulk user operations
router.get("/bulk", async (req, res) => {
    // Get the filter from the query parameters
    const filter = req.query.filter || "";

    // Find users whose first name or last name matches the filter
    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter } },
            { lastName: { "$regex": filter } }
        ]
    })

    // Send a JSON response with the users
    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

// Export the router

module.exports = router;

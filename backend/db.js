// This file connects to a MongoDB database and defines two schemas: User and Account.
// The User schema defines the structure of a user object, including the username, password,
// first name, and last name. The Account schema defines the structure of an account object,
// including the user ID and balance.

// Import the mongoose library
const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost:27017/paytm");

// Define the User schema
// The User schema defines the structure of a user object.
// It has the following fields:
// - username: a required, unique, trimmed, lowercase string with a minimum length of 3 and a maximum length of 30
// - password: a required string with a minimum length of 6
// - firstName: a required trimmed string with a maximum length of 50
// - lastName: a required trimmed string with a maximum length of 50
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

// Define the Account schema
// The Account schema defines the structure of an account object.
// It has the following fields:
// - userId: a required reference to the User model
// - balance: a required number
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

// Create the Account model from the Account schema
const Account = mongoose.model('Account', accountSchema);

// Create the User model from the User schema
const User = mongoose.model('User', userSchema);

// Export the User and Account models
module.exports = {
	User, // Export the User model
    Account // Export the Account model
};
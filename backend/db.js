// Connect to MongoDB using Mongoose
// The `connect` method returns a promise that resolves when the connection is established
// If the connection is successful, log a success message to the console
// If the connection fails, log an error message to the console
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/paytm", {
    // Use the `useNewUrlParser` option to enable the new URL parser
    // This option is required for MongoDB Node.js Driver 3.1.0 and later
    useNewUrlParser: true,
    // Use the `useUnifiedTopology` option to enable the new topology engine
    // This option is required for MongoDB Node.js Driver 3.1.0 and later
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Create a Schema for Users
// A Schema is a way to define the structure of a document in MongoDB
// In this case, the schema has four fields: `username`, `password`, `firstName`, and `lastName`
// The `username` field is a string, is required, and must be unique
// The `password` field is a string, is required, and must have a minimum length of 6 characters
// The `firstName` and `lastName` fields are both strings, are required, and have a maximum length of 50 characters
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

// Create a Schema for Accounts
// An Account document has two fields: `userId` and `balance`
// The `userId` field is a reference to a User document, is required, and is unique
// The `balance` field is a number, is required, and has a default value of 0
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Create models for Users and Accounts
// Models are constructor functions that create new documents based on the schema
// The first argument is the name of the model, and the second argument is the schema
const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

// Export the models so they can be used in other parts of the application
module.exports = {
  User,
  Account,
};


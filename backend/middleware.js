// This file contains the middleware function for authentication. 
// It reads the token from the request headers and verifies the token using the JWT_SECRET
// from the config file.

// Import the JWT_SECRET from the config file
const { JWT_SECRET } = require("./config");

// Import the jsonwebtoken library
const jwt = require("jsonwebtoken");

// Define the authentication middleware function
const authMiddleware = (req, res, next) => {
    // Read the authorization header from the request
    const authHeader = req.headers.authorization;

    // If the authorization header is not present or does not start with 'Bearer '
    // then return a 403 response
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token using the JWT_SECRET
        const decoded = jwt.verify(token, JWT_SECRET);

        // Add the userId from the decoded token to the request object
        req.userId = decoded.userId;

        // Call the next middleware function
        next();
    } catch (err) {
        // If the token is invalid, return a 403 response
        return res.status(403).json({});
    }
};

// Export the authentication middleware function
module.exports = {
    authMiddleware
}

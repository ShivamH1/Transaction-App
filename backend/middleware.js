/**
 * This middleware function is responsible for authenticating incoming requests.
 * It checks the Authorization header of the request for a valid JWT token.
 * If the token is valid, it extracts the userId from the token and assigns
 * it to the req object, so that it can be used in subsequent middleware
 * functions.
 * If the token is invalid or missing, it returns a 403 status code with
 * an empty JSON response.
 */
const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    /**
     * Get the Authorization header from the request.
     * This header should contain a JWT token.
     */
    const authHeader = req.headers.authorization;

    /**
     * Check if the Authorization header is present and if it starts
     * with 'Bearer '.
     * If it does, extract the token from the header.
     * If it doesn't, return a 403 status code with an empty JSON response.
     */
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    /**
     * Try to verify the token using the JWT_SECRET from the config file.
     * If the token is valid, extract the userId from the decoded token.
     * Assign the userId to the req object, so that it can be used in
     * subsequent middleware functions.
     * If the token is invalid, catch the error and return a 403 status code
     * with an empty JSON response.
     */
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

/**
 * Export the authMiddleware function so that it can be used in the main
 * application.
 */
module.exports = {
    authMiddleware
}

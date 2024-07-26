// This is the main entry point of the Express application.
// It sets up the Express app, configures middleware, and defines routes.

const express = require('express');
// Import the Express module, which provides a framework for building web applications and APIs.

const cors = require("cors");
// Import the CORS (Cross-Origin Resource Sharing) module, which enables servers to indicate 
// whether or not the actual response can be shared with requesting clients from a different domain.

const rootRouter = require("./routes/index");
// Import the rootRouter module, which is a router instance that handles incoming requests.
// It is defined in the routes/index.js file.

const app = express();
// Create a new instance of the Express application.

// Use the CORS middleware to enable CORS for all requests.
// This allows cross-origin requests from different domains to access the API.
app.use(cors());

// Use the express.json() middleware to parse incoming requests with JSON payloads.
// This middleware automatically parses JSON data and makes it available on the request object.
app.use(express.json());

// Mount the rootRouter instance at the "/api/v1" path.
// This means that any requests that arrive at the "/api/v1" path will be handled by the rootRouter.
app.use("/api/v1", rootRouter);

// Start the Express application and listen on port 8080.
// This makes the API available at http://localhost:8080/api/v1.

app.listen(8080);

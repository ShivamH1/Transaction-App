// This is the entry point of our Express application. It sets up the server and
// configures it to handle incoming requests.

// First, we import the necessary modules:
// - express: the web framework we're using
// - cors: a middleware that enables Cross-Origin Resource Sharing, allowing 
//         requests from other domains
// - rootRouter: a module that contains the routes for our API endpoints

// We create a new instance of the Express application using the express() function.
const app = express();

// We use the app.use() method to specify middleware that will be applied to all 
// incoming requests. In this case, we're using the cors() middleware to enable 
// Cross-Origin Resource Sharing.
app.use(cors());

// We use the app.use() method again to specify middleware that will be applied to 
// all incoming JSON requests. This includes the parsing of JSON request bodies.
app.use(express.json());

// We use the app.use() method to specify the root router for our API endpoints.
// This means that all requests to paths starting with "/api/v1" will be handled 
// by the rootRouter module.
app.use("/api/v1", rootRouter);

// We start the server and listen for incoming requests on port 3000.

app.listen(3000);

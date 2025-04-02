import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';  // Make sure to import cors middleware

dotenv.config(); // Load environment variables from .env

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// CORS configuration
app.use(
    cors({
        origin: ['https://localhost:5173'], // Specify allowed origin (frontend URL)
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    })
);

// Define a simple GET route at the root '/'
app.get('/', (req, res) => {
    console.log(req);  // Log the request details for debugging (optional)
    res.status(200).send('GET Request called');  // Return standard 200 status for success
});

// Optionally, you can add more routes as needed here
app.use('/')

// Start the server and listen on the port specified in the environment variable
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
});

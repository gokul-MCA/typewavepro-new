import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import mongoose from "mongoose"; 
// import cookieSession from "cookie-session";
// import passport from "passport";
// import authRoute from "./routes/auth.js";
// import apiRoutes from "./routes/api.js";
// import result from "./routes/resultApi.js";
import resultRoutes from "./routes/resultApi.js";
import connectDB from "./config/db.js";
import "./passport.js"; 

dotenv.config(); // Load environment variables from .env

connectDB();

// Check if critical environment variables are present
if (!process.env.MONGO_URI || !process.env.PORT) {
  console.error("Missing required environment variables: mongoDBURL or PORT");
  process.exit(1); // Exit if crucial environment variables are missing
}

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["typewave-pro"],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );
app.use("/results", resultRoutes);
// app.use(passport.initialize());
// app.use(passport.session());


// CORS configuration
app.use(
  cors({
    origin: ["https://localhost:5173"], // Specify allowed origin (frontend URL)
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true,
  })
);

// Define a simple GET route at the root '/'
app.get("/", (req, res) => {
  console.log(req); // Log the request details for debugging (optional)
  res.status(200).send("GET Request called"); // Return standard 200 status for success
});

// Optionally, you can add more routes as needed here
// app.use("/",result);
// app.use("/api",apiRoutes); // protected routes

// Start the server and listen on the port specified in the environment variable
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});

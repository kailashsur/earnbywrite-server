import express from "express";
import 'dotenv/config'
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors"
import verifyJWT from "./middlewares/authMiddleware.js";

//-----Import Statement End -----

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URI = process.env.DATABASE_URI;

// Connect to MongoDB
connectDB(DATABASE_URI); 

// Middleware
app.use(bodyParser.json());
app.use(cors())

// Routes
app.use("/api/v1/u/",userRouter)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
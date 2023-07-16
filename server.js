import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import employeeRoutes from "./routes/employeeRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// starting an instance of the express 
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

// using the secret keys form the dotenv file 
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
mongoose.connect(MONGODB_URL).then(() => {
    console.log("MongoDB connection successfull")
}).catch((error) => {
    console.log(error);
})

app.use("/employees", employeeRoutes);
app.use("/projects", projectRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send(`<h1>Server is started</h1>`);
})

app.listen(PORT, () => {
    console.log("Server is live on port " + PORT);
})
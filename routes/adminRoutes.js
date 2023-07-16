import express from "express";
import { signup, signin } from "../controllers/adminController.js"
import auth from "../middleware/auth.js";

const adminRoutes = express.Router();

adminRoutes.post("/signup", signup)
adminRoutes.post("/signin", signin)

export default adminRoutes;
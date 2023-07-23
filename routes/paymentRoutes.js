import express from "express";
import { createPayment, getPayments, getPaymentsById, getPaymentsOfProjectByMonth, getPaymentsOfProjectByYear } from "../controllers/paymentsController.js";
import auth from "../middleware/auth.js";

const paymentRoutes = express.Router();

paymentRoutes.post("/", auth, createPayment);
paymentRoutes.get("/", auth, getPayments);
paymentRoutes.get("/:id", auth, getPaymentsById);
paymentRoutes.get("/month/:id", auth, getPaymentsOfProjectByMonth);
paymentRoutes.get("/year/:id", auth, getPaymentsOfProjectByYear);

export default paymentRoutes;
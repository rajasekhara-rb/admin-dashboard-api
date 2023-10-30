import express from "express";
import { createPayment, getDailySales, getMonthlySales, getPayments, getPaymentsById, getPaymentsByProjectId, getPaymentsOfProjectByMonth, getPaymentsOfProjectByYear, getSalesByProjectId, getYearlySales } from "../controllers/paymentsController.js";
import auth from "../middleware/auth.js";

const paymentRoutes = express.Router();
const salesRoutes = express.Router();

paymentRoutes.post("/", auth, createPayment);
paymentRoutes.get("/", auth, getPayments);
paymentRoutes.get("/:id", auth, getPaymentsById);
paymentRoutes.get("/month/:id", auth, getPaymentsOfProjectByMonth);
paymentRoutes.get("/year/:id", auth, getPaymentsOfProjectByYear);
paymentRoutes.get("/project/:id", auth, getPaymentsByProjectId);

salesRoutes.get("/?", auth, getSalesByProjectId);
salesRoutes.get("/daily", auth, getDailySales);
salesRoutes.get("/monthly", auth, getMonthlySales)
salesRoutes.get("/yearly", auth, getYearlySales)

export {
    paymentRoutes,
    salesRoutes,
}

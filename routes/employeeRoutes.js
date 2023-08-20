import express from "express";
import auth from "../middleware/auth.js";
import { createEmployee, getEmployees, updateEmployee, deleteEmployee, getOneEmployeeById, getEmployeesByProjectId, getUnassignedEmployees } from "../controllers/employeeController.js";

const employeeRoutes = express.Router();

employeeRoutes.get("/", auth, getEmployees)
employeeRoutes.get("/:id", auth, getOneEmployeeById)
employeeRoutes.get("/projectId/:projectId", auth, getEmployeesByProjectId)
employeeRoutes.get("/unassignedEmployees",  getUnassignedEmployees)
employeeRoutes.post("/", auth, createEmployee)
employeeRoutes.put("/:id", auth, updateEmployee)
employeeRoutes.delete("/:id", auth, deleteEmployee)


export default employeeRoutes;
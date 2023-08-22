import express from "express";
import auth from "../middleware/auth.js";
import { createEmployee, getEmployees, updateEmployee, deleteEmployee, getOneEmployeeById, getEmployeesByProjectId, getUnassignedEmployees } from "../controllers/employeeController.js";

const employeeRoutes = express.Router();
const unassignedEmployeeRoute = express.Router()

employeeRoutes.get("/", auth, getEmployees)
employeeRoutes.get("/:id", auth, getOneEmployeeById)
employeeRoutes.get("/projectId/:projectId", auth, getEmployeesByProjectId)
employeeRoutes.post("/", auth, createEmployee)
employeeRoutes.put("/:id", auth, updateEmployee)
employeeRoutes.delete("/:id", auth, deleteEmployee)

unassignedEmployeeRoute.get("/", getUnassignedEmployees)
export {
    unassignedEmployeeRoute,
    employeeRoutes,
}

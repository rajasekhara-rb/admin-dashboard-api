import express from "express";
import auth from "../middleware/auth.js";
import { createProject, deleteProject, getOneProjectById, getProjects, updateProject } from "../controllers/projectController.js";

const projectRoutes = express.Router();

projectRoutes.get("/", auth, getProjects);
projectRoutes.get("/:id", auth, getOneProjectById);
projectRoutes.post("/", auth, createProject);
projectRoutes.put("/:id", auth, updateProject);
projectRoutes.delete("/:id", auth, deleteProject);


export default projectRoutes;

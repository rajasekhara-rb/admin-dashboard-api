import express from "express"

const projectRoutes = express.Router();

projectRoutes.get("/", (req, res) => {
    res.send("projects get")
})

projectRoutes.post("/", (req, res) => {
    res.send("create project")
})
export default projectRoutes;
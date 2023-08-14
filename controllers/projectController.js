import projectModel from "../models/projectModel.js";
import employeeModel from "../models/employeeModel.js";

const createProject = async (req, res) => {
    const { name, description } = req.body;
    const id = req.userId;
    console.log(id)
    try {
        const newProject = new projectModel({
            projectName: name,
            projectDescription: description,
            userId: id,
        })
        const result = newProject.save();
        res.send({ message: "Project created", project: newProject })
    } catch (error) {
        console.log(error);
        res.send({ message: "something went wrong" })
    }
}

const getProjects = async (req, res) => {
    const id = req.userId;
    try {
        const result = await projectModel.find({ userId: id });
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ message: "something went wrong" })
    }
}

const getOneProjectById = async (req, res) => {
    const userId = req.userId;
    const id = req.params.id;
    try {
        const result = await projectModel.findOne({ "userId": userId, "_id": id })
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ message: "something went wrong" });
    }
}

const updateProject = async (req, res) => {
    const id = req.params.id;
    const { name, description, status, progress } = req.body;
    try {
        const newProject = {
            projectName: name,
            projectDescription: description,
            projectStatus: status,
            projectProgress: progress,
        }
        const result = await projectModel.findByIdAndUpdate(id, newProject, { new: true });
        res.send({ message: "project details updated", project: result })
    } catch (error) {
        console.log(error);
        res.send({ message: "something went wrong" });
    }
}

const deleteProject = async (req, res) => {
    const id = req.params.id;
    try {
        await projectModel.deleteOne({ _id: id });
        res.send({ message: "Project deleted" });
    } catch (error) {
        console.log(error);
        res.send({ message: "something went wrong" });
    }
}

const assignEmployeesToProject = async (req, res) => {
    const { projectId, assignedEmployeesIds } = req.body;
    try {
        const result = await projectModel.updateOne({ _id: projectId },
            { $set: { assignedEmployees: assignedEmployeesIds } });

        assignedEmployeesIds.map(async (employee) => {
            const empResult = await employeeModel.updateOne({ _id: employee }, {
                $set: { assignedProject: projectId, projectAssigned: true }
            })
        })
        res.send({ message: "assigned successfully" })
    } catch (error) {
        console.log(error);
        res.send({ message: "something went wrong" });
    }
}

const changeProjectOfEmployees = async (req, res) => {
    const { employeeId, projectId, newProjectId } = req.body;
    try {
        await projectModel.updateOne({ _id: projectId },
            { $pull: { "assignedEmployees": employeeId } });

        await employeeModel.updateOne({ _id: employeeId },
            { $set: { "assignedProject": newProjectId } });

        await projectModel.updateOne({ _id: newProjectId },
            { $push: { "assignedEmployees": employeeId } });

        res.send({ message: "Project changed successfully" });
    } catch (error) {
        console.log(error);
        res.send({ message: "something went wrong" });
    }
}

export {
    createProject,
    getOneProjectById,
    getProjects,
    updateProject,
    deleteProject,
    assignEmployeesToProject,
    changeProjectOfEmployees,
}
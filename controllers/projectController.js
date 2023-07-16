import projectModel from "../models/projectModel.js";

const createProject = async (req, res) => {
    const { name, description } = req.body;
    const id = req.id;
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
    const id = req.id;
    try {
        const result = await projectModel.find({ userId: id });
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ message: "something went wrong" })
    }
}

const getOneProjectById = async (req, res) => {
    const userId = req.id;
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
        const result = await projectModel.findByIdAndUpdate(id,newProject,{new:true});
        res.send({message:"project details updated", project:result})
    } catch (error) {
        console.log(error);
        res.send({ message: "something went wrong" });
    }
}

const deleteProject = async (req, res) => {
const id = req.params.id;
try {
    await projectModel.deleteOne({_id:id});
    res.send({message:"Project deleted"});
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
}
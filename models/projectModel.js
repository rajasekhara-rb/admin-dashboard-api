import mongoose, { Schema } from "mongoose";
import adminModel from "../models/adminModel.js";

const projectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    projectDescription: {
        type: String,
    },
    projectStatus: {
        type: String,
    },
    projectProgress: {
        type: Number,
    },
    assignedEmployees: {
        type: Array,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        // required: true,
    }
}, { timestamps: true })

const Project = mongoose.model("Project", projectSchema)

export default Project;

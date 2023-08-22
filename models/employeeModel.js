import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// const MONGODB_URL = process.env.MONGODB_URL;
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const employeeSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true,
    },
    employeeEmail: {
        type: String,
        required: true,
    },
    employeePhoneNo: {
        type: Number,
        required: true,
    },
    assignedProject: {
        type: String,
    },
    assigned: {
        type: Boolean,
    }

}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema)

export default Employee

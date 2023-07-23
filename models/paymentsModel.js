import mongoose, { Schema } from "mongoose";

const paymentsSchema = new mongoose.Schema({
    projectId: {
        type: String,
        // ref: "Project",
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Payments = mongoose.model("Payments", paymentsSchema);

export default Payments;
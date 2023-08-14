import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existinguser = await adminModel.findOne({ email: email });
        if (existinguser) {
            res.status(400).send({ message: "User already exists" });
        } else {
            const hassedPassword = await bcrypt.hash(password, 10);
            const result = await adminModel.create({
                email: email,
                password: hassedPassword,
                name: name,
            })

            const token = jwt.sign({ email: email, id: result._id }, JWT_SECRET_KEY);
            res.status(201).send({ user: result, token: token })
        }
    } catch (error) {
        console.log(error);
        res.send({ message: "something went wrong" })
    }
}
const signin = async (req, res) => {
    const { email, password } = req.body;
    // const userDetails = req.userDetails;
    // console.log(userDetails)
    try {
        const existinguser = await adminModel.findOne({ email: email })
        // console.log(existinguser)
        if (!existinguser) {
            res.send({ message: "Invalid crednetials" })
        } else {
            const matchPassword = await bcrypt.compare(password, existinguser.password);
            if (!matchPassword) {
                res.send({ message: "Invalid crednetials" })
            } else {
                const signInToken = jwt.sign({ id: existinguser._id, name: existinguser.name, email: existinguser.email }, JWT_SECRET_KEY);
                res.send({ message: "Signin Successfull", user: { name: existinguser.name, email: existinguser.email, id: existinguser._id }, token: signInToken })
            }
        }
    } catch (error) {
        console.log(error);
        res.send({ message: "Something went wrong" })
    }
}

export { signup, signin }
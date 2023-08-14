import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (token) {
            const jwtToken = token.split(" ")[1];
            // console.log(jwtToken);
            const result = jwt.verify(jwtToken, JWT_SECRET_KEY);
             req.userId = result.id;
             req.userDetails = result
            //  console.log(result)
            next()
        } else {
            res.send({ message: "Unauthorized User" })
        }
    } catch (error) {
        console.log(error);
        res.send({ message: "Unauthorized" })
    }
}

export default auth;
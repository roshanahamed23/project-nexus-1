import bcrypt from "bcrypt"
import { userModel } from "../models/User.js"
import jwt from "jsonwebtoken"
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const dbuser = await userModel.findOne({ email }).exec();
        if (dbuser) {
            const match = await bcrypt.compare(password, dbuser.password);
            if (match) {
                const token = jwt.sign({ name: dbuser.name, email: dbuser.email }, process.env.SECRET_KEY)
                res.status(200).json({
                    message: "login successfully",
                    token
                })
            } else {
                throw new Error("username or password is incorrect")
            }

        } else {
            throw new Error("email not registered")
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }


}
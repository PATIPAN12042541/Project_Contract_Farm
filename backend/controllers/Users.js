import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async(req, res) => {
    const { username, 
            password, 
            confirmPassword,
            name,
            lastName,
            roleID } = req.body;
    if(password !== confirmPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            username: username,
            password: hashPassword,
            name : name,
            last_name : lastName,
            role_id : roleID
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}


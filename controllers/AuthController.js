const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "User is already exist", success: false
            });
        }
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,hash)=>{
                const newUser = await userModel.create({
                    email,
                    name,
                    password:hash
                })
            })
        })
       

        res.status(201).json({
            message: "signup successfully", success: true
        })
    } catch (error) {

        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}


const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user =await userModel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: "email or password is wrong",
                success: false
            })
        }
        const result = await bcrypt.compare(password, user.password)
        if (!result) {
            return res.status(403).json({
                message: "email or password is wrong",
                success: false
            })
        }

        const token = jwt.sign({ email: email, id: user._id }, process.env.JWT_SECRET)
        res.status(200).json({
            message: "login successfully",
            success: true,
            name: user.name,
            email,
            token
        })
    }

    catch (error) {
        res.status(500).json({
            message: "Internal server error",error,
            success: false
        })
    }
}

module.exports={signup,login}
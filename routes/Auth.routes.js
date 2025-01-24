const route = require("express").Router();
const {signupValidation, loginValidation } = require("../middlewares/authValidation")
const { signup, login } = require("../controllers/AuthController")

route.post("/signup",signupValidation,signup)
route.post("/login",loginValidation,login)
module.exports = route;
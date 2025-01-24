const express=require("express");
const app = express();
const cors=require("cors")
require("dotenv").config();
const connection= require("./config/db")
const port=process.env.PORT;
const AuthRoutes = require("./routes/Auth.routes")

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/auth",AuthRoutes)

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})

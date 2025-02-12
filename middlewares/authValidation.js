const joi =require("joi");

const signupValidation=(req,res,next)=>{
    const schema=joi.object({
        name:joi.string().min(4).max(30).required(),
        email:joi.string().email().required(),
        password:joi.string().min(4).max(20).required()
    })

    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request",error})
    }
    next();
}

const loginValidation= (req,res,next)=>{
    const schema= joi.object({
        email:joi.string().email(),
        password:joi.string().min(4).max(20)
    })
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message:"Bad request",error
        })
    }
    next();
}

module.exports={signupValidation, loginValidation}


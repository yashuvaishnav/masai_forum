
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
const {UserModel} = require("../Model/UserModel")

userRouter.post("/register",async (req,res)=>{
    const { username, avatar,email, password} = req.body
    const findThiUserAlreadyExist= await UserModel.findOne({email:email});
if(findThiUserAlreadyExist){
    return res.status(200).send({"message":"This Email Is Already Registerd"});
}
    try {
        bcrypt.hash(password, 5, async(err,hash)=>{
            if(err){
                res.send(err)
            }else{
                
                const user = new UserModel({
                    username, avatar,email, 
                    password:hash
                })
                await user.save();
                res.status(201).send({msg: "New User registerd", user: req.body})
            }
        })
    } catch (error) {
        console.log(error)
    }
})

userRouter.post("/login", async(req,res)=>{
    const { email, password} = req.body
    const findIfTHisEmailIsNotReg=await UserModel.findOne({email:email});
if(!findIfTHisEmailIsNotReg){
    return res.status(200).send({"message":"This EmailId is not registered"});
}
    try {
       const user = await UserModel.findOne({email})
       if(user){
        bcrypt.compare(password, user.password, (err, result)=>{
            if(err){
                res.status(400).send({msg: "Wrong Credential"})
            }else{
                if(result){
                    const token = jwt.sign({username: user.username}, "masaiforum")
                    res.status(200).send({msg: "Login Successful", token: token, user:user})
                }else{
                    res.status(400).send({msg: "Wrong Credential"})
                }
            }
        })
       }
       
    } catch (error) {
        console.log(error)
    }
})

module.exports={
    userRouter
}
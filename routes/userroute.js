const express = require("express")
const userroute = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { usermodel } = require("../models/usermodel")




userroute.post("/signup", async (req, res) => {
     try {
        const { email, password } = req.body
        let userpresent = await usermodel.findOne({ email })
        if (userpresent) {
           return res.send({"msg":"User already present please Login"})
        }
        let hashpassword = bcrypt.hashSync(password, 8)
        const newuser = new usermodel({  email, password: hashpassword})
        await newuser.save()
        res.status(201).send({"msg":"Registration Successfull!!"})
        
    } catch (error) {
     console.log(error)
    }
})

userroute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const userfound = await usermodel.findOne({ email })
        if (!userfound) {
           return res.status(404).send({"msg":"User not found plase signup"})
        }
        let comparepass= await bcrypt.compare(password, userfound.password)
        if (!comparepass) {
            return res.status(400).send({ "msg": "Incorrect password" })
            
        }
 let token=jwt.sign({email:userfound.email,userid:userfound._id},process.env.secretkey,{expiresIn:"6hr"})
      
     res.status(201).send({msg:"Login successfull!!","token":token})
    } catch (error) {
     console.log(error)
    }
})


module.exports={userroute}
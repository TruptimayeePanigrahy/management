const express = require("express")

const employeroute = express.Router()
const {DashboardModel}=require("../models/dashboardmodel")

employeroute.get("/getemployee", async (req, res) => {
    try {
        const data = await DashboardModel.find()
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})

employeroute.post("/employees", async (req, res) => {
    try {
        let data = req.body
        const newdata = new DashboardModel(data)
      await newdata.save()
     res.status(200).send({"msg":"Employee addedd successfully!!"})
    } catch (error) {
       console.log(error) 
    }
})
employeroute.patch("/update/:id", async (req, res) => {
    let {id}=req.params
    let newdata=req.body
   try {
       await DashboardModel.findByIdAndUpdate({_id:id},newdata)
       res.status(200).send({"msg":"Employee updated successfully"})
   } catch (error) {
       console.log(error)
   }
})

employeroute.delete("/delete/:id", async (req, res) => {
    let {id}=req.params
    
   try {
       await DashboardModel.findByIdAndDelete({_id:id})
       res.status(200).send({"msg":"Employee deleted successfully"})
   } catch (error) {
       console.log(error)
   }
})


module.exports={employeroute}
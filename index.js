const express = require("express")
const cors = require("cors")
require("dotenv").config()
const { connection } = require("./db")
const { userroute } = require("./routes/userroute")
const {employeroute}=require("./routes/dashboard")
const app = express()
app.use(express.json())
app.use(cors())

app.use("/user",userroute)
app.use("/employee",employeroute)


app.get("/", (req, res) => {
    res.send("home page")
})

app.listen(process.env.port, async() => {
    try {
        await connection
        console.log("db connected")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running")
})
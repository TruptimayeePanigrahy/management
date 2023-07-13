const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
    // confirmpassword: { type: String, require: true }
})

const usermodel = mongoose.model("user", userschema)

module.exports={usermodel}
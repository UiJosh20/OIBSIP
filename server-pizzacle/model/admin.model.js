const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
require('dotenv').config()
const URI = process.env.URL

mongoose.connect(URI)
.then((response)=>{
    console.log("admin Database is connected successfully")
})
.catch((err)=>{
    console.error(err);
})

let adminSchema = mongoose.Schema({
    adminId:{type: String, required: true, unique:true},
    password:{type:String, required: true},
    otp:{type: String, unique: true},
    otpExpiration:{
        type: Date
    }
})


let adminModel = mongoose.model('adminModel', adminSchema)

module.exports = adminModel
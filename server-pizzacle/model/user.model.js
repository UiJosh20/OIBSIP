const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('dotenv').config()
const URI = process.env.URL

mongoose.connect(URI)
.then((response)=>{
    console.log("Database is connected successfully")
})
.catch((err)=>{
    console.error(err);
})

let userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{type: String, required: true, unique:true},
    password:{type: String, required: true},
    otp:{type: String, unique: true},
    otpExpiration:{
        type: Date
    }
})

userSchema.pre("save", function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

let userModel = mongoose.model('userModel', userSchema)

module.exports = userModel

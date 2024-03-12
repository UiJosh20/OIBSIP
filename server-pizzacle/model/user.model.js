const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const URI = 'mongodb+srv://pizzacle1:<password>@cluster0.ycbpqb5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(URI)
.then((response)=>{
    console.log(response)
})
.catch((err)=>{
    console.error("issue with database");
})

let userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{type: String, required: true, unique:true},
    password:{type:String, required: true},
    otp:{type: String, unique: true},
    otpExpiration:{
        type: Date
    }
})

userSchema.pre("save", function(next){
    bcrypt.hash(this.password, 10, ((err, hash)=>{
      console.log(hash);
      this.password = hash
      next()
    }))
  })

let userModel = mongoose.model('userModel', userSchema)

module.exports = userModel

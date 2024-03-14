const bcrypt = require('bcrypt');
const adminModel = require("../model/admin.model");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
const otp = generateOTP();
const otpExpiration = new Date(Date.now() + 30 * 60 * 1000);
const adminId = "admin1234";
const password = "password1234";

// Hash the password
bcrypt.hash(password, 10)
  .then(hashedPassword => {
    // Create a new admin with hashed password
    const admin = new adminModel({ adminId, password: hashedPassword, otp, otpExpiration });

    // Save the admin to the database
    admin.save()
      .then((result) => {
        console.log("Admin saved successfully");
      })
      .catch((err) => {
        console.log("Couldn't save admin:", err);
      });
  })
  .catch(error => {
    console.error("Error hashing password:", error);
  });

const adminLogin = (req, res) => {
  console.log(req.body);
};

module.exports = {
  adminLogin,
};

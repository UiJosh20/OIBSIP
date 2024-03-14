const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const adminModel = require("../model/admin.model");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
const otp = generateOTP();
const otpExpiration = new Date(Date.now() + 30 * 60 * 1000);
const adminId = "admin1234";
const password = "password1234";


adminModel.findOne({ adminId } , { maxTimeMS: 50000 })
  .then(existingAdmin => {
    if (!existingAdmin) {

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error("Error hashing password:", err);
          return;
        }
        const admin = new adminModel({
          adminId,
          password: hashedPassword,
          otp,
          otpExpiration
        });
        admin.save()
          .then(() => {
            console.log("Admin saved successfully");
          })
          .catch((err) => {
            console.log("Couldn't save admin:", err);
          });
      });
    } else {
      console.log("Admin already exists");
    }
  })
  .catch((err) => {
    console.log("Error checking existing admin:", err);
  });

const adminLogin = (req, res) => {
  console.log(req.body);
  let { adminId, password } = req.body;

  adminModel.findOne({adminId}, { maxTimeMS: 30000 })
  .then((admin) => {
    console.log(admin);
    if (!admin) {
      console.log("user not found");
      res.send({ message: "admin not found", adminExist: false });
    } else {
      bcrypt.compare(password, admin.password, (err, match) => {
        if (err) {
          console.log("Error comparing passwords:", err);
          return res.status(500).json({ message: "Internal Server Error" });
        }
        if (!match) {
          console.log("Incorrect password");
          return res.status(401).send({ message: "Incorrect password" });
        } else {
          const token = jwt.sign({ adminId }, secret, { expiresIn: "1h" });
          console.log("User signed in successfully");
          res.send({
            message: "User signed in successfully",
            status: true,
            user: user,
            token: token,
          });
        }
      });
    }
  })
  .catch((err) => {
    console.error("Error finding user:", err);
    res.status(500).send({ message: "Internal server error" });
  });
};

module.exports = {
  adminLogin,
};

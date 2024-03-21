const userModel = require("../model/user.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const MAILEREMAIL = process.env.MAILEREMAIL;
const MAILERPASS = process.env.MAILERPASS;
const secret = process.env.SECRET;

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
const generateVerificationTokenLink = (verificationToken) => {
  return `http://localhost:3000/user/verify/${verificationToken}`;
};

const verificationToken = generateVerificationToken();
const verificationTokenLink = generateVerificationTokenLink(verificationToken);

const userRegister = (req, res) => {
  const otp = generateOTP();
  const otpExpiration = new Date(Date.now() + 30 * 60 * 1000);
  const { email } = req.body;
  const users = new userModel({ ...req.body, otp, otpExpiration });
  users
    .save()
    .then(() => {
      console.log("User saved successfully");
      sendVerificationToEmail(email);
      res
        .status(201)
        .send({ message: "User registered successfully", status: 200 });
    })
    .catch((error) => {
      console.error("Error saving user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

const sendVerificationToEmail = (email) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: MAILEREMAIL,
        pass: MAILERPASS,
      },
    });

    const mailOptions = {
      from: MAILEREMAIL,
      to: email,
      subject: "Verify your email address",
      text: `Congratulations your email has been verified successfully`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const userLogin = (req, res) => {
  let { email, password } = req.body;
  userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.status(404).send({ message: "User not found" });
      }

      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        if (!match) {
          console.log("Incorrect password");
          return res.status(401).send({ message: "Incorrect password" });
        }

        const token = jwt.sign({ email }, secret, { expiresIn: "1h" });
        console.log("User signed in successfully");
        res.send({
          message: "User signed in successfully",
          status: true,
          user: user,
          token: token,
        });
      });
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).send({ message: "Internal server error" });
    });
};

const sendOTPToEmail = (email, otp) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: MAILEREMAIL,
        pass: MAILERPASS,
      },
    });

    const mailOptions = {
      from: MAILEREMAIL,
      to: email,
      subject: "Pizzacle forgotten password OTP",
      text: `Your one time password OTP is : ${otp}
This OTP is valid for 30 minutes. Please do not share this OTP with anyone.
          `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const forgotten = (req, res) => {
  const otp = generateOTP();
  const expirationTime = new Date(Date.now() + 30 * 60 * 1000);
  const { email } = req.body;

  userModel
    .findOneAndUpdate(
      { email },
      { otp, otpExpiration: expirationTime },
      { new: true, upsert: true }
    )
    .then((user) => {
      if (user) {
        sendOTPToEmail(email, otp)
          .then(() => {
            res
              .status(200)
              .send({ message: "OTP sent to email", status: true, otp: otp });
          })
          .catch((error) => {
            res.status(500).json({ error: "Failed to send OTP to email" });
          });
      } else {
        console.log("user not found");
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Database error" });
    });
};

const verifyOTP = (req, res) => {
  const { otp } = req.body;
  
  userModel
    .findOne({ otp })
    .then((user) => {
      if (user) {
        user.otp = null;
        user.otpExpiration = null;
        user
          .save()
          .then(() => {
            res
              .status(200)
              .json({ message: "OTP verified successfully", status: true });
          })
          .catch((error) => {
            console.error("Error clearing OTP:", error);
            res.status(500).json({ error: "Internal Server Error" });
          });
      } else {
        res.status(404).json({ message: "Invalid OTP", status: false });
      }
    })
    .catch((error) => {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};


const createNewPassword = (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
    userModel
      .findOneAndUpdate({ email }, { password: hashedPassword }, { new: true })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .send({ message: "User not found", status: false });
        }

        res
          .status(200)
          .json({ message: "Password updated successfully", status: true });
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Internal Server Error" });
      });
  });
};

const verifyToken = (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
    } else {
      console.log(decoded);
      console.log("Token verified successfully");
      res.send({
        message: "Token verified successfully",
        status: true,
        decoded: decoded,
        valid: true,
        token: token,
      });
    }
  });
};

module.exports = {
  userRegister,
  userLogin,
  forgotten,
  verifyOTP,
  createNewPassword,
  verifyToken,
};

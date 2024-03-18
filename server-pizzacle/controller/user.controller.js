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
      text: `click on the link to verify your email ${verificationTokenLink}`,
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

const verifyEmailFromTokenLink = (req, res) => {
  const { token } = req.params;

  userModel
    .findOne({ verificationToken: token })
    .then((user) => {
      if (user) {
        user.isVerified = true;
        return user.save();
      } else {
        res.status(404).json({ message: "Invalid token" });
      }
    })
    .then((user) => {
      res.send(`
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body{
            background-color:black;
            border-top: 2px solid rgb(9, 216, 9);
            height: 100vh;
        }
        main{
            color: white;
            padding: 30px;
            border-radius: 20px;
        }
        section{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
    </style>
</head>
<body>
    <section>
        <main>
            <h4>Your email as been verified successfully, continue with your login process</h4>
        </main>
    </section>
</body>
</html>
            `);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

const userLogin = (req, res) => {
  let { email, password } = req.body;

  console.log(req.body);

  userModel
    .findOne({ email })
    .then((user) => {
      console.log(user)
      bcrypt.compare(password, user.password, (match, err) => {
            console.log(match);
            if (err) {
              console.log("Error comparing passwords:", err);
              return res.status(500).json({ message: "Internal Server Error" });
            }
          })

      if (!user) {
        console.log("user not found");
        res.send({ message: "User not found", userExist: false });
      } else {
        bcrypt.compare(password, user.password, (err, match) => {
          console.log(match);
          if (err) {
            console.log("Error comparing passwords:", err);
            return res.status(500).json({ message: "Internal Server Error" });
          }
          if (!match) {
            console.log("Incorrect password");
            return res.status(401).send({ message: "Incorrect password" });
          } else {
            const token = jwt.sign({ email }, secret, { expiresIn: "1h" });
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
  userRegister,
  verifyEmailFromTokenLink,
  userLogin,
};



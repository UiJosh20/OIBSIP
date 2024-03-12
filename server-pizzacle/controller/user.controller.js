const userModel = require('../model/user.model')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const MAILEREMAIL = process.env.MAILEREMAIL
const MAILERPASS = process.env.MAILERPASS

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

const generateVerificationToken = () =>{
    return crypto.randomBytes(32).toString('hex')
}
const generateVerificationTokenLink = (verificationToken) =>{
    return `http://localhost:3000/api/v1/user/verify/${verificationToken}`
}

const verificationToken = generateVerificationToken()
const verificationTokenLink = generateVerificationTokenLink(verificationToken)

const userRegister = (req, res) => {
    const otp = generateOTP()
    const otpExpiration = new Date(Date.now() + 30 * 60 * 1000);
    const users = new userModel({ ...req.body, otp, otpExpiration })
    const { email } = req.body;
    users.save()
        .then(() => {
            console.log("User saved successfully");
            sendVerificationToEmail(email);
            res.status(201).send({ message: "User registered successfully", status: 200 });
        })
        .catch((error) => {
            console.error("Error saving user:", error);
            res.status(500).json({ message: "Internal Server Error" });
        });
}


const sendVerificationToEmail = (email) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: MAILEREMAIL,
                pass: MAILERPASS
            }
        });

        const mailOptions = {
            from: MAILEREMAIL,
            to: email,
            subject: 'Verify your email address',
            text: `click on the link to verify your email <p>${verificationTokenLink}</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}


module.exports = {
    userRegister,
    
}
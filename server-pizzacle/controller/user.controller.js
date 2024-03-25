const userModel = require("../model/user.model");
const UserCart = require('../model/userCart.model');
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

const pizzaList = [
  {
    id: 1,
    name: "Margherita",
    description: "A classic pizza with tomato sauce, mozzarella cheese, and basil.",
    price: 10,
    image_URL: "https://res.cloudinary.com/dubaep0qz/image/upload/v1711019363/pizzacle/l52iwm6t3jmf1osobn47.png"
  },
  {
    id: 2,
    name: "Pepperoni",
    description: "A pizza with tomato sauce, mozzarella cheese, and pepperoni.",
    price: 12,
    image_URL:"https://res.cloudinary.com/dubaep0qz/image/upload/v1711019366/pizzacle/ubeeehds8jfhvcbjqyb6.png",

  },
  {
    id: 3,
    name: "Hawaiian",
    description: "A pizza with tomato sauce, mozzarella cheese, and ham and pineapple.",
    price: 15,
    image_URL:"https://res.cloudinary.com/dubaep0qz/image/upload/v1711019366/pizzacle/ubeeehds8jfhvcbjqyb6.png",

  },
  {
    id: 4,
    name: "Veggie",
    description: "A pizza with tomato sauce, mozzarella cheese, and various vegetables.",
    price: 13,
         image_URL:"https://res.cloudinary.com/dubaep0qz/image/upload/v1711019366/pizzacle/ubeeehds8jfhvcbjqyb6.png",

  },
  {
    id: 5,
    name: "Meat Lovers",
    description: "A pizza with tomato sauce, mozzarella cheese, and various meats.",
    price: 14,
    image_URL:"https://res.cloudinary.com/dubaep0qz/image/upload/v1711019366/pizzacle/ubeeehds8jfhvcbjqyb6.png",

  },
  {
    id: 6,
    name: "Cheese",
    description: "A pizza with tomato sauce, mozzarella cheese, and extra cheese.",
    price: 11,
    image_URL:"https://res.cloudinary.com/dubaep0qz/image/upload/v1711019366/pizzacle/ubeeehds8jfhvcbjqyb6.png",

  },
  {
    id: 7,
    name: "BBQ Chicken",
    description: "A pizza with tomato sauce, mozzarella cheese, and barbecue chicken.",
    price: 16,
    image_URL:"https://res.cloudinary.com/dubaep0qz/image/upload/v1711019366/pizzacle/ubeeehds8jfhvcbjqyb6.png",

  },
  {
    id: 7,
    name: "Chicken Tikka",
    description: "A pizza with tomato sauce, mozzarella cheese, and chicken tikka.",
    price: 17,
    image_URL:"https://res.cloudinary.com/dubaep0qz/image/upload/v1711019366/pizzacle/ubeeehds8jfhvcbjqyb6.png",

  },
  {
    id: 8,
    name: "Mexican Green Wave",
    description: "A pizza with tomato sauce, mozzarella cheese, and various meats and vegetables.",
    price: 18,
    image_URL:"https://res.cloudinary.com/dubaep0qz/image/upload/v1711019366/pizzacle/ubeeehds8jfhvcbjqyb6.png",

  },
  {
    id: 9,
    name: "Mexican Red Wave",
    description: "A pizza with tomato sauce, mozzarella cheese, and various meats and vegetables.",
    price: 20,
    image_URL:"https://res.cloudinary.com/dubaep0qz/image/upload/v1711019366/pizzacle/ubeeehds8jfhvcbjqyb6.png",

  },
  {
    id: 10,
    name: "Mexican Yellow Wave",
    description: "A pizza with tomato sauce, mozzarella cheese, and various meats and vegetables.",
    price: 20,
    image_URL:"https://res.cloudinary.com/dubaep0qz/image/upload/v1711019366/pizzacle/ubeeehds8jfhvcbjqyb6.png",

  },

  {
    id: 11,
    name: "Mexican Blue Wave",
    description: "A pizza with tomato sauce, mozzarella cheese, and various meats and vegetables.",
    price: 20,
    image_URL:"https://res.cloudinary.com/dubaep0qz/image/upload/v1711019366/pizzacle/ubeeehds8jfhvcbjqyb6.png",

  }
]

const sideDish = [
  {
    id: 1,
    name: "Garlic Bread",
    description: "A classic bread with garlic butter.",
    price: 5,
    image_URL:"",
  },
  {
    id: 2,
    name:"French Fries",
    description:"Fried irish potatoes",
    price: 10,
    image_URL:"",
  },
  {
    id: 3,
    name:"Chicken Wings",
    description:"Fried chicken wings",
    price: 15,
    image_URL:"",
  },
  {
    id: 4,
    name:"Cacio e pepe",
    description:"A combination of pasta and vegetables",
    price:'24',
    image_URL:"",
  },
  {
    id: 5,
    name: "Caesar Salad",
    description:'A romanian salad',
    price:'20',
    image_URL:"",
  }
]

const drinks = [
  {
    id: 1,
    name: "Coca Cola",
    description: "A carbonated soft drink",
    price: 5,
    image_URL:"",
  },
  {
    id: 2,
    name: "Pepsi",
    description: "A carbonated soft drink",
    price: 5,
    image_URL:"",
  },
  {
    id: 3,
    name: "Sprite",
    description: "A carbonated soft drink",
    price: 5,
    image_URL:"",
  },
  {
    id: 4,
    name: "Fanta",
    description: "A carbonated soft drink",
    price: 5,
    image_URL:"",
  },

]
const pizzaMenu = (req, res) => {
  res.send(pizzaList);
}
const pizzaDisplay = (req, res) => {
  const id = parseInt(req.params.id);
  const pizza = pizzaList.find(pizza => pizza.id === id);
  if (!pizza) {
      res.status(404).json({ error: 'Van not found' });
  } else {
      res.send(pizza);
  }
}

const userCart = (req, res) => {
  const { image, name, price, productId, quantity,} = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.SECRET);
  const userId = decoded.email;


  const newCartItem = {
    image,
    name,
    price,
    productId,
    quantity,
  };
  UserCart.findOneAndUpdate(
    { userId },
    { $push: { items: newCartItem } },
    { upsert: true, new: true }
  )
    .then((cart) => {
      console.log("Product added to cart:", cart);
      res.status(201).send(cart);
    })
    .catch((error) => {
      console.error("Error adding product to cart:", error);
      res.status(500).send({ error: "Internal Server Error" });
    });

}

module.exports = {
  userRegister,
  userLogin,
  forgotten,
  verifyOTP,
  createNewPassword,
  verifyToken,
  pizzaMenu,
  pizzaDisplay,
  userCart,
};

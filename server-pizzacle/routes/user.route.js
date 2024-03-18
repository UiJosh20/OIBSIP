const express = require('express')
const router = express.Router()
const {userRegister, userLogin, verifyEmailFromTokenLink} = require("../controller/user.controller")

router.post('/user/register', userRegister)
router.get('/user/verify/:verificationToken', verifyEmailFromTokenLink)
router.post('/user/login', userLogin)


module.exports = router
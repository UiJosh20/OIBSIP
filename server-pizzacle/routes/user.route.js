const express = require('express')
const router = express.Router()
const {userRegister, userLogin, verifyEmailFromTokenLink} = require("../controller/user.controller")

router.post('/user/register', userRegister)
router.post('/user/login', userLogin)
router.get('/user/verify/:verificationToken', verifyEmailFromTokenLink)


module.exports = router
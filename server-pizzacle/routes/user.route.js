const express = require('express')
const router = express.Router()
const {userRegister} = require("../controller/user.controller")
const { model } = require('mongoose')

router.post('/user/register', userRegister)


module.exports = router
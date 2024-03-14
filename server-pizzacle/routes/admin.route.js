const express = require('express')
const adminRouter = express.Router()
const {adminLogin} = require("../controller/admin.controller")


adminRouter.post('/admin/login', adminLogin)


module.exports = adminRouter
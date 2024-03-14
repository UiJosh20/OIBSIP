const express = require("express")
const cors = require('cors')
const userRouter = require("./routes/user.route")
const adminRouter = require("./routes/admin.route")
require('dotenv').config()
const PORT = process.env.PORT
const app = express()


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/', userRouter)
app.use('/', adminRouter)


app.listen(PORT, () => {
  console.log(`Server is running on host ${PORT}`)
})

const express = require("express")
const cors = require('cors')
const userRouter = require("./routes/user.route")
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
console.log(__dirname)

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/', userRouter)


app.listen(PORT, () => {
  console.log(`Server is running on host ${PORT}`)
})

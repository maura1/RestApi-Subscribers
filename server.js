const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')


//LOAD the environment variables
dotenv.config({path:'./config/config.env'})
connectDB()
const app = express()


//Allows or server to accept JSON  as a body
app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers',subscribersRouter)


const PORT = process.env.PORT || 3100









app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
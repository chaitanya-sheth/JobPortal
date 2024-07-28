//package imports
// const express = require("express")
import express from 'express'
import "express-async-error"
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'

//Security import
import helmet from 'helmet' //use for header data(token or any other imp thing) security
import xss from 'xss-clean' // to secure crud request
import mongoSanitize from 'express-mongo-sanitize'  //to secure mongo db

//file imports
import connectDB from './config/db.js'

//import routes
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import jobsRoutes from './routes/jobsRoutes.js'
import errorMiddleware from './middleware/errorMiddleware.mjs'

dotenv.config()

connectDB()

//rest object
const app = express()

//middleware
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
// app.get("/",(req,res)=>{
//     res.send("Hello")
// })

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use("/api/v1/test", testRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/job",jobsRoutes)
app.use(errorMiddleware)

const PORT = process.env.PORT || 8080

app.listen(8080,()=>{
    console.log(`Server is running on port ${PORT}`.bgGreen.white)
})
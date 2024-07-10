// const express = require("express")
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const app = express()

app.get("/",(req,res)=>{
    res.send("Hello")
})

const PORT = process.env.PORT || 8080

app.listen(8080,()=>{
    console.log(`Server is running on port ${PORT}`.bgGreen.white)
})
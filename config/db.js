import mongoose from 'mongoose'
import color from 'colors'

const connectDB = async() => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connection successful")
    }
    catch(error){
        console.log(`MongoDB Connection Error: ${error}`.bgRed.white)
    }
}

export default connectDB;
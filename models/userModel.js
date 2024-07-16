import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required']
    },
    latName:{
        type:String,
    },
    email:{
        type:String,
        required:[true, 'Email is Require'],
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
        default:'India'
    }
},
{timestamps:true})

//middleware
userSchema.pre("save",async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

export default mongoose.model('User',userSchema)
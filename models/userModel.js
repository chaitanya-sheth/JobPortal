import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        required:true,
        select:true
    },
    location:{
        type:String,
        default:'India'
    }
},
{timestamps:true})

// //middleware
userSchema.pre("save",async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

// Middleware to hash password before saving
// userSchema.pre("save", async function (next) {
//     if (!this.isModified('password')) return next();

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

userSchema.methods.createJWT = function () {
    return jwt.sign({userId:this._id}, process.env.SECRET_KEY, {expiresIn:'1d'})
}



export default mongoose.model('User', userSchema);

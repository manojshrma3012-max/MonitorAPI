import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9]+$/.test(v);
            },
            message: "Username can only contain letters and numbers"
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: "Please enter a valid email address"
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        validate: {
            validator: function(v) {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(v);
            },
            message: "Password must be at least 6 characters long and contain at least one letter and one number"
        }
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
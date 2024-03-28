import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"Please provide username"],
        unique: true,
    },
    email:{
        type: String,
        required: [true,"Please provide email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true,"Please provide password"],
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenDate: Date,
});

// if 1st time , then make model else use the existing model
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default userSchema;
import mongoose from "mongoose";
import validator from "validator"


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, "please enter the name"]
    },
    email: {
        type: String,
        required:[true,"please enter email"],
        unique: true,
        validate: [validator.isEmail, "please enter the valid email"]
    },
    password: {
        type: String,
        required:[true,"please enter the password"],
        minLength:[6,"Minimum password length 6"]
    }
})

export const userModel = mongoose.model("user",userSchema);
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, "please add a name"]
    }, 
    email: {
        type: String, 
        required: [true, "please add an email"],
        unique: true
    }, 
    password: {
        type: String, 
        required: [true, "please add a password"]
    },
    businessName: {
        type: String, 
        required: false
    },
    businessType: {
        type: String, 
        required: false
    },
    mainProduct: {
        type: String, 
        required: false
    },
    userType: {
        type: String, 
        required: [true, "please add a userType"]
    },
    businessRegistration:{
        type: String,
        required: false
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)
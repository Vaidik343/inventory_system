const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({

    _id:{
        type: String,
        default: uuidv4
    },

    role: {
        type: String,
        ref: "Roles",
       required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },

    last_login: {
        type: Date
    }
   
    
}, { timestamps: true })

module.exports = mongoose.model("Users", userSchema);
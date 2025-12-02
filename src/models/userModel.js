const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({

    _id:{
        type: String,
        default: uuidv4
    },

    role: {
        type: String,
        ref: "Role",
        require : true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        
    },
    isActive: {
        type: Boolean,
        require: true,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    last_login: {
        type: Date,
             default: Date.now
    }
    
})

module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');
const roleSchema = new mongoose.Schema({
    _id:{
       type: String,
    default: uuidv4
    },

    name:{
        type: String,
        unique: true,
        required: true,
    },
    permissions: [{
        resource: String,
      action: String,
    }]
}, {timestamps: true})

module.exports = mongoose.model("Roles", roleSchema);
const { v4: uuidv4 } = require('uuid');
const mongoose = require("mongoose")

const permissionSchema = new mongoose.Schema({
    _id:{
        type: String,
        default: uuidv4
    },
    resource:{
        type: String,
        
        required: true,
    },
    action:{
        type: String,
     
        required: true,
    },
    description:{
        type: String,
     
        required: false
    }
}, {timestamps : true})

permissionSchema.index({ resource: 1, action: 1 }, { unique: true });

module.exports = mongoose.model("Permission", permissionSchema);

const { v4: uuidv4 } = require('uuid');
const mongoose = require("mongoose")
const gallerySchema = new mongoose.Schema({

       _id:{
           type: String,
        default: uuidv4
        },
    
        path:{
            type: String,
            unique: true,
            required: true,
        }

})

module.exports = mongoose.model("Gallery", gallerySchema);

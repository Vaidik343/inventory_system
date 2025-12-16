const { v4: uuidv4 } = require('uuid');
const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({

       _id:{
           type: String,
        default: uuidv4
        },
    
        name:{
            type: String,
            unique: true,
            required: true,
        }

})

module.exports = mongoose.model("Category", categorySchema);

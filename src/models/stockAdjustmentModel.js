const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');

const adjustmentSchema = new mongoose.Schema({

    _id:{
        type:String,
        default:uuidv4
    },
    productId:{
                   type: String,
        ref:"Products",
         required: true
    },
    changes:{ 
        type:Number,
         required: true
    },
    reason:{
        type:String,
         required: true
    },
    referenceId:{
        type:String,
        required: false
    },
    changedBy:{
        type: String,
    ref: "Users",   
    required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("StockAdjustment", adjustmentSchema)
const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');

const adjustmentSchema = new mongoose.Schema({

    _id:{
        type:String,
        default:uuidv4
    },
    productId:{
                   type: String,
        ref:"Products"
    },
    changes:{ 
        type:Number
    },
    reason:{
        type:String
    },
    referenceId:{
        type:String
    },
    changedBy:{
        type:String
    }
}, { timestamps: true })

module.exports = mongoose.model("StockAdjustment", adjustmentSchema)
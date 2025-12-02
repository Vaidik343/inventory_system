const { v4: uuidv4 } = require('uuid');
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({

    _id:{
        type:String,
        default: uuidv4
    },

    name:{
        type: String,
        required: true
    },
    sku:{
        type: String,
        required: true,
         unique: true
    },
    description:{
        type: String,
        required: false
    },
    categoryId:[{
        type: String,
        ref:"Category",
        required: true
    }],
    supplierId:[{
        type: String,
        ref:"Suppliers",
        required: true
    }],

    unit:{
        type: String,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    sell_price:{
        type: Number,
        required: true
    },
    tax_rate:{
        type: Number,
        required: true
    },
    stock_qty:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        // ref: "Gallery",
       
    },
    

},{ timestamps: true })

module.exports = mongoose.model("Products", productSchema)
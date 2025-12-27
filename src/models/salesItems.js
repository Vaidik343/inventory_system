const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');
const salesItemsSchema = new mongoose.Schema({
    _id:{
        type:String,
        default:uuidv4
    },
    productId:{
                   type: String,
            ref: "Products",
            required: true
    },
    quantity:{
        type: String,
        required: true
    },
    sell_price:{
        type: String,
        require:true

    },
    tax: {
  type: Number,
  default: 0,
},
    discount:{
        type:String,
        require:false 
    }
}, { timestamps: true })

module.exports = mongoose.model("SalesItems", salesItemsSchema) 
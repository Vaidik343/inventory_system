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
        type: Number,
    required: true
    },
    sell_price:{
        type: Number,
    required: true
    },
    tax: {
  type: Number,
  default: 0,
},
    discount:{
         type: Number,
   default: 0
    },
    total:{
    type: Number,
    required: true
}
}, { timestamps: true })

module.exports = mongoose.model("SalesItems", salesItemsSchema) 
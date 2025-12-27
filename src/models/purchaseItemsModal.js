const { default: mongoose } = require("mongoose")
const { v4: uuidv4 } = require('uuid');
const purchaseItemsSchema = new mongoose.Schema({
    _id:{
        type:String,
        default:uuidv4
    },
    productId:{
           type: String,
        ref: "Products",
        required: true
    },
    qty:{
        type:Number,
        require:true
    },
    cost_price:{
            type: Number,
            require:true
    },
    batch_No: { 
        type: String,
        required: true
    },
        expiry: {
            type: String,
            required: true
        }

}, { timestamps: true })

module.exports = mongoose.model("PurchaseItems", purchaseItemsSchema);
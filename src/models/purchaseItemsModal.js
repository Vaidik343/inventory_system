const { default: mongoose } = require("mongoose")

const purchaseItemsSchema = new mongoose.Schema({
    _id:{
        type:String,
        default:uuidv4
    },
    productId:{
        ref:"Product"
    },
    qty:{
        type:String,
        require:true
    },
    const_price:{
            type: String,
            require:true
    },
    batch_No: {
        type: String,
        require: true
    },
        expiry: {
            type: String,
            require: true
        }

})

module.exports = mongoose.model("PurchaseItems", purchaseItemsSchema);
const { default: mongoose } = require("mongoose")

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
        type:String,
        require:true
    },
    cost_price:{
            type: String,
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
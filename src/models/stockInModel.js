
const { v4: uuidv4 } = require('uuid');

const stockSchema = new mongoose.Schema({
    _id:{
        type:String,
          default: uuidv4
    },
    supplierId:{
        type:String,
        ref: "Suppliers",
        required: true
        
    },
    total:{
        type:String,
        required: true
    },
    sub_total:{
        type:String,
        required: true
    },
    tax:{
        type: String,
        required: true
    },
    invoice_file_path: {
        type: String,
        required: true
    },
     status: {
        type: String,
        enum: ["pending", "received", "cancelled"],
        default: "received"
    },
    createdBy:{
        type:String,
        ref: "Users",
        required: true
    },


  purchase_items: [{
    type: String,
    ref: "PurchaseItems", 
    required: true
}] 

}, { timestamps: true })

module.exports = mongoose.model("Stocks", stockSchema);
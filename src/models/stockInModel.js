

const stockSchema = new mongoose.Schema({
    _id:{
        type:String,
          default: uuidv4
    },
    supplierId:{
        type:String,
        ref: "Supplier"
        
    },
    total:{
        type:String,
    },
    sub_total:{
        type:String
    },
    tax:{
        type: String,
    },
    invoice_file_path: {
        type: String
    },
    Status:{
        type:Boolean
    },
    createdBy:{
        type:String
    },
    createdAt:{
        type: String
    },

    purchase_items:{
        ref:"PurchaseItems"
    }
})

module.exports = mongoose.modal("Stock", stockSchema);
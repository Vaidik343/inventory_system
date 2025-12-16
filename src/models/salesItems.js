const salesItemsSchema = new mongoose.Schema({
    _id:{
        type:String,
        default:uuidv4
    },
    productId:{
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
    discount:{
        type:String,
        require:false 
    }
}, { timestamps: true })

module.exports = mongoose.model("SalesItems", salesItemsSchema) 
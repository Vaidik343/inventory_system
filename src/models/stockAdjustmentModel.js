
const adjustmentSchema = new mongoose.Schema({

    _id:{
        type:String,
        default:uuidv4
    },
    productId:{
        ref:"Products"
    },
    changes:{
        type:String
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
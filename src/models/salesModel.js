const { default: mongoose } = require("mongoose")

const salesSchema = new mongoose.Schema({
    _id:{
        type: String,
        default:uuidv4
    },
    subtotal:{
        type:String,
         required: true

    },
    total:{
        type:String,
         required: true
    },
    payment_status:{
        type:String,
        require:true
    },
    invoiceNumber:{
        type:String,
         required: false

    },
    createdBy:{
        type:String,
        ref: "Users",
         required: true
    },
 
    soldAt:{
        type: Date,
        default: Date.now,
         required: true
    },
    
}, { timestamps: true })

module.exports = mongoose.model("Sales", salesSchema);
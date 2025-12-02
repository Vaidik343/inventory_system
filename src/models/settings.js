
const { v4: uuidv4 } = require('uuid');

const settingSchema = new mongoose.Schema({

    _id:{
        type: String,
        default: uuidv4
    },

  
    companyName: {
        type: String,
        require: false,

    },
       address: {
    street: String,
    city: String,
    country: String,
    pin_code: String
    },


    invoice_prefix: {
        type: String,
      
        
    },
    tax_rates: {
        type: String,
        required: true,
       
    },
      
    currency:{
        type:String
    }
    
}, { timestamps: true })

module.exports = mongoose.model("Settings", settingSchema);
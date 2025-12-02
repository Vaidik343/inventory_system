const { default: mongoose } = require("mongoose")
const { v4: uuidv4 } = require('uuid');

const supplierSchema = new mongoose.Schema({
    _id:{
        type: String,
          default: uuidv4
    },
    name: {
         type: String,
        required: true
    },
    contact_person: {
         type: String,
        required: true
    },
    email: {
         type: String,
        required: true,
        unique: true
    },
    phone: {
         type: String,
        required: true
    },
    address: {
    street: String,
    city: String,
    country: String,
    pin_code: String
    },

  payment_term: {
  type: String,
  enum: ["paid", "unpaid"],
  default: "unpaid"
},
    note:{
        type:String

    }

},{ timestamps: true })

module.exports = mongoose.model("Suppliers", supplierSchema)
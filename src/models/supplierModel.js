const { default: mongoose } = require("mongoose")

const supplierSchema = new mongoose.Schema({
    _id:{
        type: String,
          default: uuidv4
    },
    name: {
         type: String,
        require: true
    },
    contact_person: {
         type: String,
        require: true
    },
    email: {
         type: String,
        require: true,
        unique: true
    },
    phone: {
         type: String,
        require: true
    },
    address: {
    street: String,
    city: String,
    country: String,
    pin_code: String
    },

    payment_term:{
        type:Boolean,
        value: ["Paid", "Not Paid Yet"]

    },
    note:{

    }

})

module.exports = mongoose.model("Supplier", supplierSchema)
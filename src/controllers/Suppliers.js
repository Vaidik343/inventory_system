const {Suppliers} = require("../models")

const getSuppliers = async(req,res) => {
    try {
        const suppliers = await Suppliers.find();

        if(suppliers.length === 0)
        {
            return res.status(404).json({message:"Not found"})
        }
        
        res.status(200).json(suppliers)
    } catch (error) {
        console.log("🚀 ~ getSuppliers ~ error:", error)
        res.status(500).json({message:"Internal server error"});

        
    }
}

const createSuppliers = async (req,res) => {
    const{name, contact_person, email, phone, address, payment_term, note} = req.body;
    try {
        const supplier = await Suppliers.create({name, contact_person, email, phone, address, payment_term, note})

         res.status(200).json(supplier)
    } catch (error) {
        console.log("🚀 ~ createSuppliers ~ error:", error)
           res.status(500).json({message:"Internal server error"});
        
    }
}

const updateSuppliers = async (req, res) => {
    const supplierId = req.params.id;
    const{name, contact_person, email, phone, address, payment_term, note} = req.body;
    try {
        
        const supplier = await Suppliers.findByIdAndUpdate(
            supplierId,
            {name, contact_person, email, phone, address, payment_term, note},
            {new:true}

        )

    
             res.status(200).json(supplier)
    } catch (error) {
        console.log("🚀 ~ updateSuppliers ~ error:", error)
         res.status(500).json({message:"Internal server error"});
    }

}
const deleteSuppliers = async (req, res) => {
    const supplierId = req.params.id;
  
    try {
        
        const supplier = await Suppliers.findByIdAndDelete(
            supplierId
        )
             res.status(200).json(supplier)
    } catch (error) {
        console.log("🚀 ~ updateSuppliers ~ error:", error)
         res.status(500).json({message:"Internal server error"});
    }

}

module.exports = {getSuppliers, createSuppliers, updateSuppliers , deleteSuppliers}
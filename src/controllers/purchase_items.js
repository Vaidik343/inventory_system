const {PurchaseItems} = require("../models");

const createPurchaseItems = async (req, res) => {
    try {
        const {productId, qty, cost_price , batch_No ,expiry} = req.body;

        const items = PurchaseItems.create({productId, qty, cost_price , batch_No ,expiry});
        console.log("🚀 ~ createPurchaseItems ~ items:", items);

        res.status(201).json(items);
        
    } catch (error) {
        console.log("🚀 ~ createPurchaseItems ~ error):", error);
          res.status(500).json({message:"Server error"});
        
    }

}

const getPurchaseItems = async (req, res) => {
    try {
        const items = PurchaseItems.find();

        if(!items)
        {
            return res.status(404).json({message:"Not found"});
        }

        res.status(200).json(items);
    } catch (error) {
        console.log("🚀 ~ getPurchaseItems ~ error:", error)
          res.status(500).json({message:"Server error"});
    }
}

const updatePurchaseItems = async (req, res) => {
    const PurItId = req.params._id;
      const {productId, qty, cost_price , batch_No ,expiry} = req.body;
    try {
        const items = PurchaseItems.findByIdAndUpdate( PurItId,
            {productId, qty, cost_price , batch_No ,expiry},
            {new:true}
        )
        console.log("🚀 ~ updatePurchaseItems ~ items:", items)
    } catch (error) {
        console.log("🚀 ~ updatePurchaseItems ~ error:", error)
        res.status(500).json({message:"Server error"});
    }

}

const deletePurchaseItems = async (req,res) => {
     const PurItId = req.params._id;
     try {
        const items = PurchaseItems.findByIdAndDelete(PurItId);
        res.status(200).json(items);
     } catch (error) {
        console.log("🚀 ~ deletePurchaseItems ~ error:", error)
        
        res.status(500).json({message:"Server error"});
     }

}


module.exports = {createPurchaseItems, getPurchaseItems ,updatePurchaseItems, deletePurchaseItems }
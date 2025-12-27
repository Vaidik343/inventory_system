const {Products, StockAdjustment} = require("../models")


const adjustStock = async (req,res) => {
    const {productId, changes, reason, referenceId } = req.body;

    const changedBy = req.body.user?.id || req.body.changedBy;

    try {
        const product = await Products.findById(productId);

        if(!product)
        {
            return res.status(404).json({message:"Product not found"})
        }

        const newQty = product.stock_qty + Number(changes);

        if (newQty < 0)
        {
            return res.status(400).json({
                message: "Stock cannot be negative"
            });
        }
        
        // update product stock
        product.stock_qty = newQty;
        await product.save();

        //Log adjustment
        const adjustment = await StockAdjustment.create({
            productId,
            changes,
            reason,
            referenceId,
            changedBy
        });

        res.status(201).json(adjustment)
        
    } catch (error) {
        console.log("🚀 ~ adjustStock ~ error:", error)
            res.status(500).json({ message: "Internal server error" });
    }

}


//get all
const getAllAdjustmentStock = async (req, res) => {
    try {
        const adjustment = await StockAdjustment.find();

        res.status(200).json(adjustment)
    } catch (error) {
        console.log("🚀 ~ getAllAdjustmentStock ~ error:", error)
        res.status(500).json({ message: "Internal server error" });
    }

}

module.exports.stockAdjustmentController = {adjustStock, getAllAdjustmentStock}
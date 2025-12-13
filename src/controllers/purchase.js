const {StockIn, PurchaseItems, Products, Suppliers} = require("../models");
const { populate } = require("../models/roleModel");

const createStockIn = async (req, res) => {
    const {supplierId, total, sub_total, tax, invoice_file_path, items } = req.body;
    const createdBy = req.user?.id || req.body.createdBy;


    try {

        // validate supplier

        const supplier = await Suppliers.findById(supplierId);
        if(!supplier) {
            return res.status(400).json({message: "Invalid supplier"});
        }

        if(!items || items.length === 0)
        {
            return res.status(400).json({message: "Purchase items required!"})
        }

        let sub_total = 0;
        const purchaseItemIds = [];

        for(const item of items) {
            const {productId, qty, cost_price, batch_No, expiry} = item;

            //validate product

            const product = await Products.findById(productId);

            if(!product)
            {
                return res.status(404).json({message:"Invalid product ID"})
            }

            sub_total += Number(qty) * Number(cost_price);

            //purchase item

            const purchaseItem = await PurchaseItems.create({
                productId,
                qty,
                cost_price,
                batch_No,
                expiry
            });

            purchaseItem.push(purchaseItem._id);

            // Increase product stock
            
            product.stock_qty = Number(product.stock_qty) + Number(qty);
            await product.save();

        }

        const total = Number(sub_total) + Number(tax || 0);

        const stockIn = StockIn.create({supplierId, total, sub_total, tax, invoice_file_path, createdBy, status:"received", purchase_items: purchaseItemIds
        });
        console.log("🚀 ~ createPurchase ~ stockIn:", stockIn)

        res.status(201).json(stockIn);
    } catch (error) {
        console.log("🚀 ~ createPurchase ~ error:", error)
         res.status(500).json({message:"Server error"});
    }

}

// get all 

const getPurchases = async (req, res) => {
    try {
        const purchases = await StockIn.find()
            .populate("SupplierId", "name email")
            .populate({
                path: "purchase_items",
                populate: {path: "productId", select:"name sku"}
            }) 
            .sort({ createdAt: -1});

            res.status(200).json(purchases);
    } catch (error) {
        console.log("🚀 ~ getPurchases ~ error:", error);
            res.status(500).json({ message: "Internal server error" }); 
    }

}

const getPurchaseById = async (req, res) => {
    try {
        const purchase = await StockIn.findById(req.params.id)
        .populate("SupplierId", "name email")
        .populate({
            path: "purchase_items",
            populate:{path: "productId", select:"name sku"}
        })
        .sort({createdAt: -1});
        res.status(200).json(purchase);
    } catch (error) {
        console.log("🚀 ~ getPurchaseById ~ error:", error)
             res.status(500).json({ message: "Internal server error" }); 
        
    }

}

module.exports = { createStockIn, getPurchases, getPurchaseById}
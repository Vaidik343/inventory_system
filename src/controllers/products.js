const {Products , Suppliers , Category} = require("../models")

const createProducts = async (req, res) => {
    const {name , sku, description,  categoryId,  supplierId, unit, cost, sell_price, tax_rate,  stock_qty, image} = req.body;
    try {

        // 1️⃣ Check SKU exists
    const existingSku = await Products.findOne({ sku });
    if (existingSku) {
      return res.status(400).json({ message: "SKU already exists" });
    }

    // 2️⃣ Check Category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // 3️⃣ Check Supplier exists
    const supplier = await Suppliers.findById(supplierId);
    if (!supplier) {
      return res.status(400).json({ message: "Invalid supplier ID" });
    }

        const products = await Products.create({name , sku, description,  categoryId,  supplierId, unit, cost, sell_price, tax_rate,  stock_qty, image, isActive: true})

        res.status(200).json(products);
    } catch (error) {
        console.log("🚀 ~ createProducts ~ error:", error)
        res.status(500).json({message:"Server error!"})
    }

}


const getProducts = async (req, res) => {
    try {
        const products = await  Products.find();
        res.status(200).json(products);
    } catch (error) {
        console.log("🚀 ~ getProducts ~ error:", error)
         res.status(500).json({message:"Server error!"})
    }

}

const updateProducts = async (req, res) => {
    const productId = req.params._id; // change to .id if needed
    const updateData = req.body;

    try {
        // Prevent updating stock directly
        if(updateData.stock_qty !== undefined)
        {
            return res.status(400).json({
                message: "Stock cannot be updated directly. Use purchases or stock adjustment." 
            });
        }

        // Prevent updating SKU  to existing SKU

        if(updateData.sku)
        {
            const skuExits = await Products.findOne({sku: updateData.sku, _id: {$ne: productId}});

            if(skuExits)
            {
                return res.status(400).json({message:"SKU already exists"});
            }
        }

        const product = await Products.findByIdAndUpdate(productId, updateData, {
            new: true
        });
    } catch (error) {
        console.log("🚀 ~ updateProducts ~ error:", error)
          res.status(500).json({message:"Server error!"})
    }

}


// soft delete
const deleteProducts = async (req, res) => {
    try {
        const product = await Products.findByIdAndUpdate(
            req.params.id,
            {isActive: false},
            {new: true}
        );
        if(!product) 
            return res.status(404).json({message:""})
    } catch (error) {
        console.log("🚀 ~ deleteProducts ~ error:", error)
           res.status(500).json({message:"Server error!"})
    }

}

module.exports.productsController = {deleteProducts , updateProducts,  getProducts , createProducts}
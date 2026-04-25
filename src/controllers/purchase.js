const { StockIn,StockAdjustment, PurchaseItems, Products, Suppliers } = require("../models");
const { populate } = require("../models/roleModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const createStockIn = async (req, res) => {
  const { supplierId, tax, invoice_file_path, items } = req.body;
  console.log("🚀 ~ createStockIn ~ supplierId, tax, invoice_file_path, items:", supplierId, tax, invoice_file_path, items)


  const createdBy = req.user?.id || req.body.createdBy;

  console.log("🚀 ~ createStockIn ~ createdBy:", createdBy)
  let session;
  try {
    // validate supplier

    const supplier = await Suppliers.findById(supplierId);
    console.log("🚀 ~ createStockIn ~ supplier:", supplier)
    if (!supplier) {
      return res.status(400).json({ message: "Invalid supplier" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Purchase items required!" });
    }

    //validation - check all products exist AND belong to this supplier
    const productIds = items.map(item => item.productId);
    const products = await Products.find({_id: { $in: productIds}});

    if(products.length !== productIds.length)
    {
      return res.status(400).json({message: "Products not found"})
    }

    // check every product belongs to this supplier
    const mismatchedProducts = products.filter(
      product => !product.supplierId.includes(supplierId)
    );

    if(mismatchedProducts.length > 0)
    {
      return res.status(400).json({
        message: `These products do not belong to this supplier: ${mismatchedProducts.map(p=> p.name).join(", ")}`
      });
    }

    //validate qty and const_price
    for(const item of items) {
      if (Number(item.qty) <= 0) {
        return res.status(400).json({message: `Invalid qty for product ${item.productId}`})
      }

      if (Number(item.cost_price) <= 0) {
        return res.status(400).json({message: `Invalid cost_price for product ${item.productId0}`})
      }
    }

    session = await mongoose.startSession();
    session.startTransaction();


    const stockIn = await StockIn.create([{
      supplierId,
      total: 0,
      sub_total: 0,
      tax,
      invoice_file_path,
      createdBy,
      status: "received",
      purchase_items: [],
    }], {session});
    console.log("🚀 ~ createPurchase ~ stockIn:", stockIn);

    
    let sub_total = 0;
    const purchaseItemIds = [];

for (const item of items) {
  const { productId, qty, cost_price, batch_No, expiry } = item;

  const product = await Products.findById(productId);
  if (!product) {
    throw new Error("Invalid product ID");
  }

  sub_total += Number(qty) * Number(cost_price);

  // Create purchase item
  const purchaseItem = await PurchaseItems.create(
    [{
      productId,
      qty,
      cost_price,
      batch_No,
      expiry,
    }],
    { session }
  );
purchaseItemIds.push(purchaseItem[0]._id); 
  //update product stock_qty
  await Products.findByIdAndUpdate(
    productId,
    {$inc: {stock_qty: Number(qty)}},
    {session}
  );


 
  // Auto stock adjustment
  await StockAdjustment.create(
    [{
      productId,
      changes: Number(qty),
      reason: "Purchase Received",
      referenceId: stockIn[0]._id,
      changedBy: req.user.id,
    }],
    { session }
  );
}


// Validation subtotal matches calculation


stockIn[0].sub_total = sub_total;
stockIn[0].total = sub_total + Number(tax || 0);
stockIn[0].purchase_items = purchaseItemIds;

await stockIn[0].save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(stockIn);
  } catch (error) {
    console.log("🚀 ~ createPurchase ~ error:", error);
   
     if (session) {
      await session.abortTransaction();
      session.endSession();
    }

     res.status(500).json({ message: "Server error" });

  }
};

// get all

const getPurchases = async (req, res) => {
  try {
    const purchases = await StockIn.find()
      .populate("supplierId", "name email")
      .populate({
        path: "purchase_items",
        populate: { path: "productId", select: "name sku" },
      })
      .sort({ createdAt: -1 });

    res.status(200).json(purchases);
  } catch (error) {
    console.log("🚀 ~ getPurchases ~ error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPurchaseById = async (req, res) => {
  try {
    const purchase = await StockIn.findById(req.params.id)
      .populate("supplierId", "name email")
      .populate({
        path: "purchase_items",
        populate: { path: "productId", select: "name sku" },
      })
      .sort({ createdAt: -1 });
    res.status(200).json(purchase);
  } catch (error) {
    console.log("🚀 ~ getPurchaseById ~ error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.purchaseController = { createStockIn, getPurchases, getPurchaseById };

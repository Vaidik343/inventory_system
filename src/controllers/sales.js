const { Sales, SalesItems, Products, StockAdjustment } = require("../models");

const createSales = async (req, res) => {
  const { payment_status, items } = req.body;

  const createdBy = req.user?.id || req.body.createdBy;
  if (!items || items.length === 0) {
      return res.status(400).json({ message: "sales items required!!" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

  try {
     const sale = await Sales.create([{
      subtotal:0,
      total:0,
      payment_status : payment_status || "pending",
      invoiceNumber: `INV-${Date.now()}`,
      createdBy,
      sales_items: [],
    }],{ session });


    let subtotal = 0;
    const salesItemIds = [];

    for (const item of items) {
      const { productId, quantity, sell_price, discount } = item;

      const product = await Products.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Stock check

      if (product.stock_qty < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      //calculate totals

      const itemTotal = (sell_price * quantity) - discount || 0;
      subtotal += itemTotal;

      //reduce stock
      product.stock_qty -= quantity;
      await product.save();

     //sales item
      const salesItem = await SalesItems.create({
        productId,
        quantity,
        sell_price,
        discount
      });

      salesItemIds.push(salesItem._id);

      // auto stock adjustment

       await StockAdjustment.create([{
        productId,
        change: -quantity,
        reason: "Sale",
        referenceId: sale._id,
        changedBy: createdBy,
      }], {session});

      

    }

        // 3️⃣ Update sale totals
    sale.subtotal = subtotal;
    sale.total = subtotal;
    sale.sales_items = salesItemIds;
   await sale[0].save({ session });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json(sale);
    
  } catch (error) {
    console.log("🚀 ~ createSales ~ error:", error);
    res.status(500).json({ message: "Server error" });
      await session.abortTransaction();
    session.endSession();
  }
};

//get all

const getSales = async (req, res) => {
  try {
    const sales = await Sales.find().populate("sales_items");
    res.status(200).json({ sales });
  } catch (error) {
    console.log("🚀 ~ getSales ~ error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSalesById = async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id).populate("sales_items");

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.status(200).json(sale);
  } catch (error) {
    console.log("🚀 ~ getSalesById ~ error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//cancel sale
const cancelSale = async (req, res) => {
  const saleId = req.params.id;

  try {
    const sale = await Sales.findById(saleId);

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

      if (sale.status !== "active") {
      return res
        .status(400)
        .json({ message: "Only active sales can be cancelled" });
    }
  const session = await mongoose.startSession();
  session.startTransaction();
    // //prevent double cancel

    // if (sale.status === "cancelled") {
    //   return res.status(400).json({ message: "Sale already cancelled" });
    // }

    //fetch sale items
    const saleItems = await SalesItems.find({
      _id: { $in: sale.sales_items },
    });

    // restore stock
    for (const item of saleItems) {
      const product = await Products.findById(item.productId);

      if (!product) continue;

      product.stock_qty += item.quantity;
      await product.save();
    }
  
    await StockAdjustment.create([{
  productId: item.productId,
  change: item.quantity,
  reason: "Sale Cancelled",
  referenceId: sale._id,
  changedBy: req.user.id
}], {session});

    //update sale status

    sale.status = "cancelled";
    sale.payment_status = "refunded";
    await sale[0].save({ session });



 await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Sale cancelled and stock restored",
      sale,
    });
  } catch (error) {
    console.log("🚀 ~ cancelSale ~ error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.salesController = { getSalesById, getSales, createSales, cancelSale };

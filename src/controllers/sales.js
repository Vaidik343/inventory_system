const mongoose = require("mongoose");
const {
  Sales,
  SalesItems,
  Products,
  StockAdjustment,
} = require("../models");

/**
 * CREATE SALE
 */
const createSales = async (req, res) => {
  const { items, payment_status } = req.body;
  const createdBy = req.user.id;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Sales items are required" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    /** 1️⃣ Create Sale Header */
    const sale = new Sales({
      invoiceNumber: `INV-${Date.now()}`,
      payment_status: payment_status || "pending",
      status: "active",
      subtotal: 0,
      total: 0,
      createdBy,
      sales_items: [],
    });

    await sale.save({ session });

    let subtotal = 0;
    let totalTax = 0;
    const salesItemIds = [];

    /** 2️⃣ Process Sale Items */
    for (const item of items) {
      let { productId, quantity, sell_price = 0, discount = 0, tax = 0 } = item;

      quantity = Number(quantity);
      sell_price = Number(sell_price);
      discount = Number(discount);
      tax = Number(tax);

      const product = await Products.findById(productId).session(session);
      if (!product) throw new Error("Product not found");

      if (product.stock_qty < quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      // Calculate totals
      const itemSubtotal = sell_price * quantity - discount;
      const itemTaxAmount = (itemSubtotal * tax) / 100;

      subtotal += itemSubtotal;
      totalTax += itemTaxAmount;

      /** Reduce stock */
      product.stock_qty -= quantity;
      await product.save({ session });

      /** Create Sales Item */
      const [salesItem] = await SalesItems.create(
        [
          {
            saleId: sale._id,
            productId,
            quantity,
            sell_price,
            discount,
            tax,
            total: itemSubtotal,
          },
        ],
        { session }
      );

      salesItemIds.push(salesItem._id);

      /** Stock Adjustment */
      await StockAdjustment.create(
        [
          {
            productId,
            change: -quantity,
            reason: "Sale",
            referenceId: sale._id,
            changedBy: createdBy,
          },
        ],
        { session }
      );
    }

    /** 3️⃣ Finalize Sale Totals */
    sale.subtotal = subtotal;
    sale.total = subtotal + totalTax; // subtotal + calculated tax
    sale.sales_items = salesItemIds;

    await sale.save({ session });

    await session.commitTransaction();
    session.endSession();

    // Populate sales_items with product info before returning
    await sale.populate({
      path: "sales_items",
      populate: { path: "productId" },
    });

    return res.status(201).json(sale);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("🚀 createSales error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};


/**
 * GET ALL SALES
 */
const getSales = async (req, res) => {
  try {
    const sales = await Sales.find()
      .populate("sales_items")
      .sort({ createdAt: -1 });

    return res.status(200).json({ sales });
  } catch (error) {
    console.error("🚀 getSales error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * GET SALE BY ID
 */
const getSalesById = async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id).populate("sales_items");

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    return res.status(200).json(sale);
  } catch (error) {
    console.error("🚀 getSalesById error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * CANCEL SALE (STOCK REVERSAL)
 */
const cancelSale = async (req, res) => {
  const saleId = req.params.id;
  const userId = req.user.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const sale = await Sales.findById(saleId).session(session);

    if (!sale) {
      throw new Error("Sale not found");
    }

    if (sale.status !== "active") {
      throw new Error("Only active sales can be cancelled");
    }

    const saleItems = await SalesItems.find({
      _id: { $in: sale.sales_items },
    }).session(session);

    /** Restore stock */
    for (const item of saleItems) {
      const product = await Products.findById(item.productId).session(session);
      if (!product) continue;

      product.stock_qty += item.quantity;
      await product.save({ session });
await sale.populate({
  path: "sales_items",
  populate: { path: "productId" },
});

      await StockAdjustment.create(
        [
          {
            productId: item.productId,
            change: item.quantity,
            reason: "Sale Cancelled",
            referenceId: sale._id,
            changedBy: userId,
          },
        ],
        { session }
      );
    }

    /** Update Sale Status */
    sale.status = "cancelled";
    sale.payment_status = "refunded";

    await sale.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: "Sale cancelled successfully",
      sale,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("🚀 cancelSale error:", error.message);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.salesController = {
  createSales,
  getSales,
  getSalesById,
  cancelSale,
};

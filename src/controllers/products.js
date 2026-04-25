const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Products, Suppliers, Category } = require("../models");
const { fileUpload } = require("../utils/fileUpload");

const createProducts = async (req, res) => {
  const {
    name,
    sku,
    description,
    categoryId,
    supplierId,
    unit,
    cost,
    sell_price,
    tax_rate,
    stock_qty,
    image,
  } = req.body;
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);
  try {
    // 1️⃣ Check SKU exists
    const existingSku = await Products.findOne({ sku });
    if (existingSku) {
      return res.status(400).json({ message: "SKU already exists" });
    }

    // Validate all categoryIds
    const rawCategoryIds = Array.isArray(categoryId) ? categoryId : [categoryId];
const categoryIds = rawCategoryIds.flatMap(id => id.split(",").map(s => s.trim()));
    const categories = await Category.find({ _id: { $in: categoryIds } });

    if (categories.length !== categoryIds.length) {
      return res.status(400).json({ message: "Invalid category IDs" });
    }

    //Validate all supplierIds
    const rawSupplierIds = Array.isArray(supplierId) ? supplierId : [supplierId];
const supplierIds = rawSupplierIds.flatMap(id => id.split(",").map(s => s.trim()));
    const suppliers = await Suppliers.find({ _id: { $in: supplierIds } });
    if (suppliers.length !== supplierIds.length) {
      return res.status(400).json({ message: "Invalid supplier IDs" });
    }

    let productImageUrl = null;

    if (req.file) {
      productImageUrl = await fileUpload(req.file.path);
    }

    const products = await Products.create({
      name,
      sku,
      description,
      categoryId: categoryIds,
      supplierId: supplierIds,
      unit,
      cost,
      sell_price,
      tax_rate,
      stock_qty: stock_qty || 0,
      image: productImageUrl,
      isActive: true,
    });
    console.log("🚀 ~ createProducts ~ products:", products);

    res.status(201).json(products);
  } catch (error) {
    console.log("🚀 ~ createProducts ~ error:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    console.log("🚀 ~ getProducts ~ error:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

const updateProducts = async (req, res) => {
  const productId = req.params.id; 
  const updateData = req.body;

  try {
    // Prevent updating stock directly
    if (updateData.stock_qty !== undefined) {
      return res.status(400).json({
        message:
          "Stock cannot be updated directly. Use purchases or stock adjustment.",
      });
    }

    // Prevent updating SKU  to existing SKU

    if (updateData.sku) {
      const skuExits = await Products.findOne({
        sku: updateData.sku,
        _id: { $ne: productId },
      });

      if (skuExits) {
        return res.status(400).json({ message: "SKU already exists" });
      }
    }


    // Validate new supplierId if being update
    if(updateData.supplierId)
    {
        const supplierIds = Array.isArray(updateData.supplierId) ? updateData.supplierId : [updateData.supplierId];

        const suppliers = await Suppliers.find({_id: {$in: supplierIds}});
        if(suppliers.length !== supplierIds.length)
        {
            return res.status(400).json({message: "invalid supplier ids"});
        }

        updateData.supplierId = supplierIds;
    }


    const product = await Products.findByIdAndUpdate(productId, updateData, {
      new: true,
    });

     if (!product) {
      return res.status(404).json({ message: "Product not found" }); // ✅
    }


    res.status(200).json(product);
  } catch (error) {
    console.log("🚀 ~ updateProducts ~ error:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

// soft delete
const deleteProducts = async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
  } catch (error) {
    console.log("🚀 ~ deleteProducts ~ error:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

module.exports.productsController = {
  deleteProducts,
  updateProducts,
  getProducts,
  createProducts,
};

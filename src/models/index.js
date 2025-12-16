const Roles = require('./roleModel');
const Users = require("./userModel");
const Products = require("./productModel");
const Gallery = require("./galleryModel");
const Category = require("./categoryModel")
const Suppliers = require("./supplierModel");
const StockIn = require("./stockInModel");
const PurchaseItems = require("./purchaseItemsModal");
const Sales = require("./salesModel");
const SalesItems = require("./salesItems");
const StockAdjustment = require("./stockAdjustmentModel");
const Settings = require("./settings")
const mongoose = require("mongoose")
module.exports = {
    Roles, Users, Products, Gallery, Suppliers, Category, StockIn, PurchaseItems, Sales, SalesItems, StockAdjustment, Settings
}   
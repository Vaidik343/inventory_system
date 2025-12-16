const express = require("express");
const router = express.Router();

const {
  purchaseController
} = require("../controllers/purchase");

// CREATE PURCHASE (Stock In)
router.post("/purchase", purchaseController.createStockIn);

// GET ALL PURCHASES
router.get("/purchase", purchaseController.getPurchases);

// GET PURCHASE BY ID
router.get("/purchase/:id", purchaseController.getPurchaseById);

module.exports = router;

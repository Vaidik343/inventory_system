const express = require("express");
const router = express.Router();

const {
  purchaseController
} = require("../controllers/purchase");

// CREATE PURCHASE (Stock In)
router.post("/", purchaseController.createStockIn);

// GET ALL PURCHASES
router.get("/", purchaseController.getPurchases);

// GET PURCHASE BY ID
router.get("/:id", purchaseController.getPurchaseById);

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  purchaseController
} = require("../controllers/purchase");
const {apiLimiter} = require('../middlewares/rateLimiter');

const {purchaseValidation} = require("../validators/purchaseValidation")
const validate = require("../middlewares/validate")

// CREATE PURCHASE (Stock In)
router.post("/purchase",apiLimiter,purchaseValidation.createStockInValidation, validate ,auth,purchaseController.createStockIn);

// GET ALL PURCHASES
router.get("/purchase",apiLimiter, purchaseController.getPurchases);

// GET PURCHASE BY ID
router.get("/purchase/:id",apiLimiter, purchaseValidation.purchaseIdValidation, validate, purchaseController.getPurchaseById);

module.exports = router;


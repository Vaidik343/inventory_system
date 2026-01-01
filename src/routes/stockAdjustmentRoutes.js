const express = require("express");
const router = express.Router();
const {apiLimiter} = require('../middlewares/rateLimiter');

const {
 stockAdjustmentController
} = require("../controllers/stockAdjustment");


const {adjustStockValidation} = require("../validators/stockAdjustmentValidation")
const validate = require("../middlewares/validate")


// MANUAL STOCK ADJUSTMENT
router.post("/stockAdjust", apiLimiter,adjustStockValidation,validate,stockAdjustmentController.adjustStock);

// VIEW STOCK ADJUSTMENT HISTORY
router.get("/stockAdjust", apiLimiter, stockAdjustmentController.getAllAdjustmentStock);

module.exports = router;
 
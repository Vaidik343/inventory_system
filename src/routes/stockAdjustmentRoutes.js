const express = require("express");
const router = express.Router();

const {
 stockAdjustmentController
} = require("../controllers/stockAdjustment");

// MANUAL STOCK ADJUSTMENT
router.post("/stockAdjust", stockAdjustmentController.adjustStock);

// VIEW STOCK ADJUSTMENT HISTORY
router.get("/stockAdjust", stockAdjustmentController.getAllAdjustmentStock);

module.exports = router;

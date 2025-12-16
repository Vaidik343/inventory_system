const express = require("express");
const router = express.Router();

const {
 stockAdjustmentController
} = require("../controllers/stockAdjustment");

// MANUAL STOCK ADJUSTMENT
router.post("/", stockAdjustmentController.adjustStock);

// VIEW STOCK ADJUSTMENT HISTORY
router.get("/", stockAdjustmentController.getAllAdjustmentStock);

module.exports = router;

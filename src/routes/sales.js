const express = require("express");
const router = express.Router();

const {
salesController
} = require("../controllers/sales");

// CREATE SALE
router.post("/", salesController.createSales);

// GET ALL SALES
router.get("/", salesController.getSales);

// GET SALE BY ID
router.get("/:id", salesController.getSalesById);

// CANCEL SALE (stock rollback)
router.patch("/:id/cancel", salesController.cancelSale);

module.exports = router;

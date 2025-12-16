const express = require("express");
const router = express.Router();

const {
salesController
} = require("../controllers/sales");

// CREATE SALE
router.post(
  "/sales",
  auth,
  permit("sale:create"),
  salesController.createSales
);

// GET ALL SALES
router.get(
  "/sales",
  auth,
  permit("sale:view"),
  salesController.getSales
);

// GET SALE BY ID
router.get("/sales/:id", salesController.getSalesById);

// CANCEL SALE (stock rollback)
router.patch("/sales/:id/cancel", salesController.cancelSale);

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { salesController } = require("../controllers/sales");

// CREATE SALE
router.post(
  "/sales",
  auth,
  salesController.createSales
);

// GET ALL SALES
router.get("/sales",salesController.getSales);

// GET SALE BY ID
router.get("/sales/:id", salesController.getSalesById);

// CANCEL SALE (stock rollback)
router.patch("/sales/:id/cancel",auth, salesController.cancelSale);

module.exports = router;

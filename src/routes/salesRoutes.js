const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { salesController } = require("../controllers/sales");
const {apiLimiter} = require('../middlewares/rateLimiter');

// CREATE SALE
router.post(
  "/sales",
  auth,
  apiLimiter,
  salesController.createSales
);

const {createSalesValidation,
  saleIdParamValidation,} = require("../validators/salesValidation")
const validate = require("../middlewares/validate")


// GET ALL SALES
router.get("/sales",apiLimiter,createSalesValidation,validate,salesController.getSales);

// GET SALE BY ID
router.get("/sales/:id", apiLimiter, saleIdParamValidation,validate,salesController.getSalesById);

// CANCEL SALE (stock rollback)
router.patch("/sales/:id/cancel",auth,apiLimiter, salesController.cancelSale);

module.exports = router;
 
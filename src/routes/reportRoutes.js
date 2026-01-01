const express = require("express");
const router = express.Router();
const {reportController} = require("../controllers/reportsController");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const {reportLimiter} = require('../middlewares/rateLimiter');

const {salesSummaryReportValidation,
  stockMovementReportValidation,} = require("../validators/reportValidation")
const validate = require("../middlewares/validate")

//salesReport
router.get("/reports/sales-summary", reportLimiter,salesSummaryReportValidation, validate,reportController.salesSummaryReport);
router.get("/reports/profit", auth, permit("report", "view"), reportLimiter, reportController.profileReport)
// console.log("🚀 ~ reports/profit:", reports/profit)
router.get("/reports/stock-movements", auth,stockMovementReportValidation,validate, permit("report", "view"),reportLimiter,
 reportController.stockMovementReport
)

    
module.exports = router;
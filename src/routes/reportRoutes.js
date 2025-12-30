const express = require("express");
const router = express.Router();
const {reportController} = require("../controllers/reportsController");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permission");

//salesReport
router.get("/reports/sales-summary", reportController.salesSummaryReport);
router.get("/reports/profit", auth,  reportController.profileReport)
// console.log("🚀 ~ reports/profit:", reports/profit)
router.get("/reports/stock-movements", auth, 
 reportController.stockMovementReport
)


module.exports = router;
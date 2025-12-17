const express = require("express");
const router = express.Router();
const {reportController} = require("../controllers/reportsController");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permission");

//salesReport
router.get("/reports/sales-summary", reportController.salesSummaryReport);
router.get("/reports/profit", auth, permit("report", "view"), reportController.profileReport)
router.get("/reports/stock-movements", auth, permit("report", "view"),
 reportController.stockMovementReport
)


module.exports = router;
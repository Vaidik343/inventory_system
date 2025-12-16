const express = require("express");
const { salesSummaryReport } = require("../controllers/reportsController");

const router = express.Router();

router.get("/reports/sales-summary", salesSummaryReport);

module.exports = router;

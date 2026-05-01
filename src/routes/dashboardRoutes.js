const express = require("express");
const router = express.Router();
const { getDashboardStats, getAnalytics } = require("../controllers/dashboardController");
const auth = require("../middlewares/auth");

// We can add permit logic if necessary, e.g. permit("dashboard", "view")
// For now, making it accessible to authenticated users
router.get("/dashboard/stats", auth, getDashboardStats);
router.get("/dashboard/analytics", auth, getAnalytics);

module.exports = router;

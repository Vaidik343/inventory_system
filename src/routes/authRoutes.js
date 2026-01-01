const express = require("express");
const router = express.Router();
const { authController } = require("../controllers/authController");
// const {auth} = require("../middlewares/auth")
const {authLimiter} = require('../middlewares/rateLimiter')
const {  salesSummaryReportValidation,
  loginValidation,} = require("../validators/authValidation")
const validate = require("../middlewares/validate")

router.post("/auth/login", authLimiter,loginValidation, validate,authController.login);
router.get("/refresh", authController.refresh);
router.post("/logout",  authController.logout);
module.exports = router;

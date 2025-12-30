const express = require("express");
const router = express.Router();
const { authController } = require("../controllers/authController");
// const {auth} = require("../middlewares/auth")
router.post("/auth/login", authController.login);
router.get("/refresh", authController.refresh);
router.post("/logout",  authController.logout);
module.exports = router;
